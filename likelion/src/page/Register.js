import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [response, setResponse] = useState(null)
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/login")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        id, // id: id
        password,
        name,
      })
      setResponse(res)
    } catch (error) {
      if (error.response) {
        setResponse(error.response)
      } else {
        setResponse({
          data: { message: "서버와 통신 중 오류가 발생했습니다." },
        })
      }
    }
  }

  const onChangeId = (e) => {
    setId(e.target.value)
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div>
      <h1>회원가입</h1>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", width: "150px" }}
      >
        <label>
          이름
          <input type="text" onChange={onChangeName} value={name} required />
        </label>
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
      {response && <p>{response.data.message}</p>}
      {response && response.status === 200 && (
        <button onClick={onClick}>로그인 페이지로 이동</button>
      )}
    </div>
  )
}

export default Register
