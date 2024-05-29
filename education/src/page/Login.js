import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState(null)

  const onChangeId = (e) => {
    setId(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 폼 제출 시 페이지 리로드 방지
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        id,
        password,
      })
      console.log(res)
      setResponse(res) // 응답 전체를 상태로 저장
    } catch (error) {
      if (error.response) {
        setResponse(error.response) // 에러 응답을 상태로 저장
      } else {
        setResponse({
          data: { message: "서버와 통신 중 오류가 발생했습니다." },
        })
      }
    }
  }
  return (
    <div>
      <h1>로그인</h1>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", width: "150px" }}
      >
        <label>
          아이디
          <input type="text" onChange={onChangeId} value={id} required />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            onChange={onChangePassword}
            value={password}
            required
          />
        </label>
        <button type="submit">등록</button>
      </form>
      {response && <p>로그인 성공: {response.data.name}님 환영합니다</p>}
    </div>
  )
}

export default Login
