import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Spin } from 'antd'
import { PlaySquareOutlined, UserAddOutlined } from '@ant-design/icons'

import bgHome from '../../../assets/images/bg-home.svg'
import sun from '../../../assets/images/sun.svg'
import ballon from '../../../assets/images/ballon.svg'
import house from '../../../assets/images/house.png'
import mainImg from '../../../assets/images/main-img.png'
import spider from '../../../assets/images/spider.svg'

import './style.scss'
import { useNavigate } from 'react-router-dom'
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../../app/services/authApi'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { setCredentials } from '../../../app/slices/authSlice'
import {
  setTokenToCookies,
  setUserToCookies,
} from '../../../utils/cookiesFunction'
import { NotificationCPN } from '../../component/NotificationCPN'

export default function HomePage() {
  useEffect(() => {
    document.title = 'Trang chủ'
    window.scrollTo(0, 0)
  }, [])

  const dispatch = useAppDispatch()

  const { access_token } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const showModalLogin = () => {
    setIsLoginModalVisible(true)
  }
  const handleCancel = () => {
    setIsLoginModalVisible(false)
  }

  const [isLoading, setIsLoading] = useState(false)
  // register
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false)
  const showModalRegister = () => {
    setIsRegisterModalVisible(true)
  }

  const [register] = useRegisterMutation()
  const onRegister = async (values) => {
    setIsLoading(true)
    try {
      const result = await register({ payload: values })
      if (result.data && result.data.id) {
        NotificationCPN({
          type: 'success',
          message: 'Thành công',
          description: 'Đăng ký thành công',
        })
        setIsRegisterModalVisible(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // login
  const [login] = useLoginMutation()
  const onFinish = async (values) => {
    setIsLoading(true)
    try {
      const result = await login({ payloadLogin: values })
      if (result.data) {
        const payload = {
          access_token: result.data.message,
          user: result.data.user,
        }
        dispatch(setCredentials(payload))
        setTokenToCookies(result.data.message)
        setUserToCookies(result.data.user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (access_token) {
      navigate('/game')
    }
  }, [access_token])

  const [form] = Form.useForm()

  return (
    <main>
      <article id="home-page" style={{ backgroundImage: `url(${bgHome})` }}>
        <div className="img-sun rotating">
          <img src={sun} alt="" />
        </div>
        <div className="house">
          <img src={house} alt="" />
          <div className="spider">
            <div className="silk releaseSilk"></div>
            <img src={spider} alt="" />
          </div>
        </div>
        <div className="main-img moveForward">
          <img src={mainImg} alt="" />
        </div>

        <div className="ballon-img goUp">
          <img src={ballon} alt="" />
        </div>

        <div className="focus-login">
          <div className="title">Xin chào, Bạn đã sẵn sàng thử thách?</div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="action">
            <Button onClick={showModalLogin} type="primary">
              <PlaySquareOutlined />
              <div>Chơi ngay</div>
            </Button>
            <Button onClick={showModalRegister}>
              <UserAddOutlined />
              <div>Tạo tài khoản</div>
            </Button>
          </div>
        </div>
      </article>
      {isLoginModalVisible && (
        <Modal
          title="Đăng nhập vào thực hiện các thử thách"
          visible={isLoginModalVisible}
          footer={null}
          onCancel={handleCancel}
          destroyOnClose={true}
          maskClosable={false}
        >
          <Spin spinning={isLoading}>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              form={form}
              preserve={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Vui lòng nhập email của bạn.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu của bạn.',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                  <b>Đăng nhập</b>
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      )}

      {isRegisterModalVisible && (
        <Modal
          title="Đăng ký và thực hiện các thử thách"
          visible={isRegisterModalVisible}
          footer={null}
          onCancel={() => setIsRegisterModalVisible(false)}
          destroyOnClose={true}
          maskClosable={false}
        >
          <Spin spinning={isLoading}>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onRegister}
              form={form}
              preserve={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Vui lòng nhập email của bạn.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu của bạn.',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ tên của bạn.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại của bạn.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                  <b>Đăng ký</b>
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      )}
    </main>
  )
}
