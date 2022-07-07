import { CaretLeftOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hook'
import {
  useGetQuestionQuery,
  useUpdateScoreMutation,
} from '../../../../app/services/roundApi'

import bgHome from '../../../../assets/images/bg-home.svg'
import bgTitle from '../../../../assets/images/bg-title.png'
import audioFinishMp3 from '../../../../assets/images/bgsound1.mp3'

import './style.scss'

export default function Round() {
  useEffect(() => {
    document.title = 'Thực hành'
    window.scrollTo(0, 0)
  }, [])

  const { user } = useAppSelector((state) => state.auth)

  const audioFinish = new Audio(audioFinishMp3)
  const startAudioFinish = () => {
    audioFinish.play()
  }

  const audioNext = new Audio(
    'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a'
  )
  const startAudioNext = () => {
    audioNext.play()
  }

  const navigate = useNavigate()

  // get question from api
  const { data } = useGetQuestionQuery('questions/list')
  const [question, setQuestion] = useState([])
  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      setQuestion(data.data)
    }
  }, [data])

  const [selectQuestion, setSelectQuestion] = useState({})
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (question.length > 0) {
      const getGuestion = question[step]
      setSelectQuestion(getGuestion)
    }
  }, [question, step])

  const [correctResult, setCorrectResult] = useState(0)
  const [selectResult, setSelectResult] = useState('')
  const handleSelectResult = (result) => {
    setSelectResult(result)
  }
  const [isResultModalVisible, setIsResultModalVisible] = useState(false)
  const [stars, setStar] = useState(0)
  const handleNext = () => {
    if (step === question.length - 1) {
      if (selectResult == selectQuestion.correct) {
        setCorrectResult(correctResult + 1)
      }

      if (1 < selectResult <= 3) {
        setStar(1)
      } else if (4 <= selectResult <= 8) {
        setStar(2)
      } else if (selectResult >= 9) {
        setStar(3)
      } else {
        setStar(0)
      }
      setIsResultModalVisible(true)
      startAudioFinish()
      setSelectResult('')
    } else {
      if (selectResult == selectQuestion.correct) {
        setCorrectResult(correctResult + 1)
      }
      setStep(step + 1)
      startAudioNext()
      setSelectResult('')
    }
  }

  const renderStar = (stars) => {
    switch (stars) {
      case 0:
        return <div className="star-result"></div>
      case 1:
        return (
          <div className="star-result">
            <StarFilled />
            <StarOutlined />
            <StarOutlined />
          </div>
        )
      case 2:
        return (
          <div className="star-result">
            <StarFilled />
            <StarFilled />
            <StarOutlined />
          </div>
        )
      case 3:
        return (
          <div className="star-result">
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </div>
        )

      default:
        break
    }
  }

  const location = useLocation()
  const getPathname = location.pathname.split('/')
  // login
  const [updateScore] = useUpdateScoreMutation()
  const handleFinishRound = async () => {
    const payload = {
      stars: stars,
      active: 1,
      lock: 0,
      round_id: Number(getPathname[4]),
      user_id: user.id,
    }
    try {
      const result = await updateScore({ payload: payload })
      if (result.data) {
        console.log(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate('/game')
      setIsResultModalVisible(false)
    }
  }

  return (
    <article id="round-page" style={{ backgroundImage: `url(${bgHome})` }}>
      {selectQuestion && selectQuestion.id && (
        <div className="round-question">
          <div
            className="number-question"
            style={{ backgroundImage: `url(${bgTitle})` }}
          >
            {step + 1}
          </div>
          <div className="title-question">Trả lời câu hỏi sau:</div>
          <div className="detail-question">{selectQuestion.content}</div>
          <div className="result">
            {Object.values(selectQuestion.answers).map((a) => (
              <div
                className={a === selectResult ? 'item active' : 'item'}
                key={a}
                onClick={() => handleSelectResult(a)}
              >
                {a}
              </div>
            ))}
          </div>
          {selectResult && (
            <div className="next">
              <Button size="large" type="button" onClick={handleNext}>
                Tiếp tục
              </Button>
            </div>
          )}
        </div>
      )}

      {isResultModalVisible && (
        <Modal
          title="chúc mừng bạn đã hoàn thành bài học"
          visible={isResultModalVisible}
          footer={null}
          onCancel={null}
          destroyOnClose={true}
          maskClosable={false}
        >
          <div className="total text-center">
            {correctResult} / {question.length}
          </div>
          <div className="mb-15">{renderStar(stars)}</div>
          <div className="text-center">
            <Button type="primary" onClick={handleFinishRound}>
              Hoàn thành
            </Button>
          </div>
        </Modal>
      )}

      <div className="back-to-round">
        <Link to="/game">
          <CaretLeftOutlined />
          Quay lại
        </Link>
      </div>
    </article>
  )
}
