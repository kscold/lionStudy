const express = require("express")
const morgan = require("morgan") // 미들웨어 연결
const cors = require("cors")

const app = express()
const port = 8080

app.use(morgan("dev")) // 개발환경이면

app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
)

const users = []

// 모든 사용자 반환 (테스트용)
app.get("/users", (req, res) => {
  res.json(users)
})

// 회원가입
app.post("/api/register", async (req, res) => {
  const { id, password, name } = req.body
  if (!id || !password || !name) {
    return res
      .status(400)
      .json({ message: "id와 password, name은 필수 입력사항입니다." })
  }

  const existingUser = users.find((user) => user.id === id)
  if (existingUser) {
    return res.status(409).json({ message: "이미 존재하는 아이디입니다." })
  }

  users.push({ id, password, name })
  res.json("사용자를 등록했습니다.")
})

// 로그인
app.post("/api/login", async (req, res) => {
  const { id, password } = req.body
  if (!id || !password) {
    return res
      .status(400)
      .json({ message: "id와 password는 필수 입력사항입니다." })
  }

  const user = users.find((user) => user.id === id)
  if (!user) {
    return res
      .status(401)
      .json({ message: "잘못된 아이디 또는 비밀번호입니다." })
  }

  res.json({ name: user.name })
})

app.listen(port, () => {
  console.log(`${port} 서버가 실행중입니다.`)
})
