import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { useLoginMutation } from '../../../app/services/authApi'
import { setCredentials } from '../../../app/slices/authSlice'
import { setTokenToCookies } from '../../../utils/cookiesFunction'

import logo from '../../../assets/images/logo.png'

import './style.scss'

function LoginPage() {
  useEffect(() => {
    document.title = 'Đăng nhập'
    window.scrollTo(0, 0)
  }, [])

  const { access_token } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      email: 'nguyenduyet@gmail.com',
      password: 'nguyenduyet@gmail.com@*#',
    })
  }, [])
  const [login] = useLoginMutation()
  const onFinish = async (values) => {
    try {
      const result = await login({ payloadLogin: values })
      if (result.data) {
        const payload = {
          access_token: result.data.access_token,
          user: result.data.user,
        }

        dispatch(setCredentials(payload))
        setTokenToCookies(result.data.access_token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (access_token) {
      if (from) {
        navigate(from, { replace: true })
      } else {
        navigate('/')
      }
    }
  }, [access_token, from])

  return (
    <section id="login-page">
      <div className="form-login">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
export default LoginPage
