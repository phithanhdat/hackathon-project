/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Popconfirm, Spin, Typography } from 'antd'
import { LogoutOutlined, StarFilled, StarOutlined } from '@ant-design/icons'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { useGetRoundQuery } from '../../../app/services/roundApi'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { logout } from '../../../app/slices/authSlice'
import { removeCookies } from '../../../utils/cookiesFunction'
import { NotificationCPN } from '../../component/NotificationCPN'
import bgHome from '../../../assets/images/bg-home.svg'
import bgRoundItem from '../../../assets/images/bg-round-item.png'
import imgLock from '../../../assets/images/img-lock.png'

const { Text } = Typography

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import './style.scss'

export default function GamePage() {
  useEffect(() => {
    document.title = 'Chọn bài học'
    window.scrollTo(0, 0)
  }, [])

  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { data, isLoading } = useGetRoundQuery(`rounds/list?user_id=${user.id}`)
  const [listRound, setListRound] = useState([])

  useEffect(() => {
    const chunkSize = 10
    if (data?.data && data?.data.length > 0) {
      const result = data.data.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].push(item)

        return resultArray
      }, [])
      setListRound(result)
    }
  }, [data])

  const [isUnlockModalVisible, setIsUnlockModalVisible] = useState(false)
  const showModalUnLock = (e) => {
    e.stopPropagation()
    setIsUnlockModalVisible(true)
  }

  const handleCancel = () => {
    setIsUnlockModalVisible(false)
  }

  const goRoundDetail = (roundId) => {
    navigate(`/game/round/${roundId}`)
  }

  const [visibleConfirm, setVisibleConfirm] = useState(false)

  const handleLogout = async () => {
    await dispatch(logout())
    await removeCookies()
    await history.push('/login')
    NotificationCPN({
      type: 'success',
      message: 'Thành công',
      description: 'Đăng xuất thành công',
    })
  }

  const renderStar = (stars) => {
    switch (stars) {
      case 0:
        return <div className="star"></div>
      case 1:
        return (
          <div className="star">
            <StarFilled />
            <StarOutlined />
            <StarOutlined />
          </div>
        )
      case 2:
        return (
          <div className="star">
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
        )
      case 3:
        return (
          <div className="star">
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </div>
        )

      default:
        break
    }
  }

  const handleUnlockRounnd = () => {
    setIsUnlockModalVisible(false)
    navigate('/game')
  }

  // const dummy = [1,2,3,4,5,6,7,8];
  
  const arr = [];

  for (let i = 0; i <= 100; i += 2) {
    arr.push(
      <div style={{
        display: 'inline-block',
        padding: '10px',
        margin: '15px',
      }}>
        <div style={{width: '100px', height: '100px', margin: 5, 
        background: "cyan",}}>{i}</div>
        <div style={{width: '100px', height: '100px', marginTop: 80, 
        background: "cyan",}}>{i + 1}</div>
        {/* {dummy[i+1] && <div>{dummy[i+1]}</div>} */}
      </div>
    );
  }

  return (
    <Spin spinning={isLoading}>
      <article id="game-page" style={{ backgroundImage: `url(${bgHome})` }}>
        <div className="wellcome">Xin chào - {user.userName} </div>
        <div className='round-container' style={{ display: 'flex', overflow: 'auto', maxWidth: '100vw' }}>
          {
            arr.map(item => {
              return item;
            })
          }
        </div>
        {/* <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {listRound.map((l, i) => (
            <SwiperSlide key={i}>
              <section className="list-round">
                {l.map((item) => (
                  <div
                    key={item.id}
                    className="item-round"
                    style={{ backgroundImage: `url(${bgRoundItem})` }}
                    data-id={item.id}
                    onClick={() => goRoundDetail(item.id)}
                  >
                    {item.lock === 1 ||
                      (item.type !== 'free' && (
                        <div className="lock" onClick={showModalUnLock}>
                          <img src={imgLock} alt="" />
                        </div>
                      ))}
                    <div className="round-number">{item.round_name}</div>
                    {renderStar(item.stars)}
                  </div>
                ))}
              </section>
            </SwiperSlide>
          ))}
        </Swiper> */}

        {isUnlockModalVisible && (
          <Modal
            title="Bạn cần mở khóa để tiếp tục"
            visible={isUnlockModalVisible}
            footer={null}
            onCancel={handleCancel}
            destroyOnClose={true}
          >
            <div className="mb-15">
              Bạn cần tốn{' '}
              <b>
                <Text type="danger">50</Text>
              </b>{' '}
              ngân lượng để mở khóa.
            </div>
            <div className="text-right">
              <Button type="primary" onClick={handleUnlockRounnd}>
                Tiến hành mở khóa
              </Button>
            </div>
          </Modal>
        )}
        <div className="logout">
          <Popconfirm
            title="Đăng xuất?"
            visible={visibleConfirm}
            onConfirm={handleLogout}
            onCancel={() => setVisibleConfirm(false)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button onClick={() => setVisibleConfirm(true)}>
              <LogoutOutlined />
              Đăng xuất
            </Button>
          </Popconfirm>
        </div>
      </article>
    </Spin>
  )
}
