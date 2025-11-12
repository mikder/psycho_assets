'use client'
import { useState } from 'react'
import Image from 'next/image'
import './globals.css'

// 8개 여신 정의
const goddesses = {
  'isis': {
    name: '이시스',
    title: '신비로운 치유자, 영혼의 연인',
    tag: '#깊은사랑 #헌신적 #영적교감',
    desc: '마법과 치유의 대여신. 깊은 통찰력과 치유의 힘으로 진정한 사랑을 추구합니다.',
    personality: '겉으로는 조용하지만 사랑하는 사람에게는 무한한 헌신. 영혼의 연결을 중시해요.',
    loveStyle: '한 사람과 깊고 진실된 관계. 서로의 상처까지 치유하는 사랑.',
    charm: '신비로운 분위기와 깊은 공감 능력. 당신과 있으면 마음이 편안해져요.',
    image: '/isis.jpg'
  },
  'hathor': {
    name: '하토르',
    title: '사랑의 전도사, 기쁨의 여신',
    tag: '#애정표현甲 #긍정에너지 #로맨티스트',
    desc: '사랑과 기쁨의 여신. 매일이 축제처럼 사랑을 즐겁게 표현합니다.',
    personality: '사랑한다는 말을 아끼지 않아요. 상대방을 행복하게 만드는 게 내 행복!',
    loveStyle: '매일 특별한 날로 만드는 로맨틱한 연애. 적극적인 애정표현.',
    charm: '밝고 따뜻한 에너지. 함께 있으면 세상이 아름다워 보여요.',
    image: '/hathor.jpg'
  },
  'nephthys': {
    name: '네프티스',
    title: '어둠의 수호자, 비밀스런 연인',
    tag: '#신비주의 #내면깊음 #감성충만',
    desc: '밤과 그림자의 여신. 조용하지만 깊은 감성으로 은밀한 사랑을 추구합니다.',
    personality: '말보다 눈빛으로 대화해요. 소수와 깊은 관계를 맺는 타입.',
    loveStyle: '비밀스럽고 은밀한 사랑. 둘만의 특별한 세계를 만들어요.',
    charm: '미스터리한 매력. 알면 알수록 빠져드는 깊은 매력.',
    image: '/nephthys.jpg'
  },
  'bastet': {
    name: '바스테트',
    title: '독립적인 수호자, 자유로운 연인',
    tag: '#독립적 #츤데레 #보호본능',
    desc: '고양이와 가정의 여신. 독립적이면서도 사랑하는 이를 지키는 수호자.',
    personality: '혼자 있는 시간도 중요해요. 하지만 내 사람은 끝까지 지킵니다.',
    loveStyle: '적당한 거리를 유지하면서도 필요할 때는 든든한 연애.',
    charm: '고양이같은 매력. 도도하면서도 은근히 다정해요.',
    image: '/bastet.jpg'
  },
  'nut': {
    name: '누트',
    title: '무한한 포용력, 우주적 사랑',
    tag: '#포용력 #자유영혼 #예술적감성',
    desc: '하늘과 별의 여신. 무한한 우주처럼 넓은 마음으로 상대를 포용합니다.',
    personality: '자유롭고 예술적이에요. 사랑도 우주처럼 무한하고 경계가 없어요.',
    loveStyle: '서로의 개성을 존중하는 자유로운 사랑. 속박하지 않는 관계.',
    charm: '예술적이고 몽환적인 매력. 함께 있으면 영감이 샘솟아요.',
    image: '/nut.jpg'
  },
  'maat': {
    name: '마아트',
    title: '진실된 연인, 정의로운 파트너',
    tag: '#정직함 #신뢰 #균형잡힌사랑',
    desc: '진리와 정의의 여신. 거짓 없는 진실된 사랑, 공정한 관계를 추구합니다.',
    personality: '정직이 최고의 미덕. 신뢰를 바탕으로 한 투명한 관계를 원해요.',
    loveStyle: '평등하고 균형잡힌 관계. 서로 존중하는 성숙한 사랑.',
    charm: '믿음직스러운 매력. 당신과 있으면 안정감을 느껴요.',
    image: '/maat.jpg'
  },
  'neith': {
    name: '네이트',
    title: '전사의 연인, 강인한 수호자',
    tag: '#강한여성 #보호본능 #독립적',
    desc: '전쟁과 사냥의 여신. 스스로 강하면서도 사랑하는 이를 지키는 전사.',
    personality: '강하고 독립적이에요. 연약한 모습은 오직 사랑하는 사람에게만.',
    loveStyle: '평등한 파트너십. 서로를 지켜주는 전우같은 연애.',
    charm: '강인하면서도 섬세한 매력. 든든한 파트너.',
    image: '/neith.jpg'
  },
  'serket': {
    name: '세르케트',
    title: '치명적 매력, 위험한 유혹',
    tag: '#치명적매력 #선택적사랑 #강렬함',
    desc: '전갈과 독의 여신. 치명적인 매력으로 한 번 빠지면 헤어날 수 없는 사랑.',
    personality: '호불호가 확실해요. 내가 선택한 사람에게만 모든 걸 바쳐요.',
    loveStyle: '강렬하고 열정적인 사랑. All or Nothing!',
    charm: '위험하면서도 매혹적인 매력. 한 번 빠지면 중독돼요.',
    image: '/serket.jpg'
  }
}

// 전체 신들 (궁합용)
const allGods = {
  // 여신 8명
  isis: '이시스',
  hathor: '하토르',
  nephthys: '네프티스',
  bastet: '바스테트',
  nut: '누트',
  maat: '마아트',
  neith: '네이트',
  serket: '세르케트',
  
  // 남신 10명
  ra: '라',
  osiris: '오시리스',
  horus: '호루스',
  seth: '세트',
  anubis: '아누비스',
  thoth: '토트',
  ptah: '프타',
  geb: '게브',
  bes: '베스',
  sobek: '소베크'
}

// 궁합 데이터
const compatibility = {
  isis: {
    good: ['osiris', 'thoth', 'horus'],
    bad: ['seth', 'sobek']
  },
  hathor: {
    good: ['horus', 'ra', 'bes'],
    bad: ['anubis', 'seth']
  },
  nephthys: {
    good: ['anubis', 'osiris', 'seth'],
    bad: ['ra', 'hathor']
  },
  bastet: {
    good: ['ptah', 'thoth', 'geb'],
    bad: ['sobek', 'seth']
  },
  nut: {
    good: ['geb', 'thoth', 'ptah'],
    bad: ['ra', 'sobek']
  },
  maat: {
    good: ['thoth', 'osiris', 'horus'],
    bad: ['seth', 'sobek']
  },
  neith: {
    good: ['ptah', 'horus', 'ra'],
    bad: ['seth', 'bes']
  },
  serket: {
    good: ['anubis', 'seth', 'horus'],
    bad: ['bes', 'hathor']
  }
}

const questions = [
  {
    id: 1,
    question: "이상적인 데이트는?",
    answers: [
      { text: "둘만의 조용한 공간에서 깊은 대화", goddess: "nephthys", weight: 2 },
      { text: "화려한 파티나 페스티벌", goddess: "hathor", weight: 2 },
      { text: "미술관이나 전시회 관람", goddess: "nut", weight: 2 },
      { text: "집에서 편안하게 보내는 시간", goddess: "bastet", weight: 2 }
    ]
  },
  {
    id: 2,
    question: "연인과 갈등이 생겼을 때 당신은?",
    answers: [
      { text: "감정적으로 깊이 공감하며 해결", goddess: "isis", weight: 2 },
      { text: "논리적으로 옳고 그름을 따져서", goddess: "maat", weight: 2 },
      { text: "일단 거리를 두고 생각할 시간을 가짐", goddess: "bastet", weight: 2 },
      { text: "직접적이고 강렬하게 맞대응", goddess: "serket", weight: 2 }
    ]
  },
  {
    id: 3,
    question: "사랑을 표현하는 방식은?",
    answers: [
      { text: "말과 스킨십으로 적극 표현", goddess: "hathor", weight: 2 },
      { text: "행동으로 조용히 보여주기", goddess: "neith", weight: 2 },
      { text: "상대의 아픔을 들어주고 위로", goddess: "isis", weight: 2 },
      { text: "특별한 순간에만 진심을 전달", goddess: "nephthys", weight: 2 }
    ]
  },
  {
    id: 4,
    question: "연애에서 가장 중요한 것은?",
    answers: [
      { text: "서로의 자유와 개성 존중", goddess: "nut", weight: 2 },
      { text: "절대적인 신뢰와 정직", goddess: "maat", weight: 2 },
      { text: "강렬한 열정과 독점욕", goddess: "serket", weight: 2 },
      { text: "편안함과 안정감", goddess: "bastet", weight: 2 }
    ]
  },
  {
    id: 5,
    question: "이별 후 당신의 모습은?",
    answers: [
      { text: "혼자 조용히 상처를 치유", goddess: "nephthys", weight: 2 },
      { text: "친구들과 즐겁게 보내며 극복", goddess: "hathor", weight: 2 },
      { text: "냉정하게 현실을 받아들임", goddess: "neith", weight: 2 },
      { text: "한 번 끝나면 절대 뒤돌아보지 않음", goddess: "serket", weight: 2 }
    ]
  },
  {
    id: 6,
    question: "연인에게 바라는 것은?",
    answers: [
      { text: "영혼까지 이해하는 깊은 교감", goddess: "isis", weight: 2 },
      { text: "매일 새로운 즐거움과 웃음", goddess: "hathor", weight: 2 },
      { text: "공평하고 균형잡힌 관계", goddess: "maat", weight: 2 },
      { text: "적당한 거리와 독립성", goddess: "bastet", weight: 2 }
    ]
  },
  {
    id: 7,
    question: "질투를 느낄 때 당신은?",
    answers: [
      { text: "속으로만 삭이고 티 안냄", goddess: "nephthys", weight: 2 },
      { text: "직접적으로 불편함을 표현", goddess: "maat", weight: 2 },
      { text: "독점욕을 강하게 드러냄", goddess: "serket", weight: 2 },
      { text: "쿨하게 넘기려 노력", goddess: "nut", weight: 2 }
    ]
  },
  {
    id: 8,
    question: "사랑에 빠진 당신의 모습은?",
    answers: [
      { text: "상대를 위해 모든 걸 바칠 준비", goddess: "isis", weight: 2 },
      { text: "행복감에 취해 세상이 아름다워 보임", goddess: "hathor", weight: 2 },
      { text: "강한 보호 본능 발동", goddess: "neith", weight: 2 },
      { text: "평소와 달리 예민하고 감성적", goddess: "serket", weight: 2 }
    ]
  },
  {
    id: 9,
    question: "연애할 때 당신의 역할은?",
    answers: [
      { text: "든든한 보호자", goddess: "neith", weight: 1 },
      { text: "치유하는 상담사", goddess: "isis", weight: 1 },
      { text: "즐거움을 주는 엔터테이너", goddess: "hathor", weight: 1 },
      { text: "신비로운 뮤즈", goddess: "nut", weight: 1 }
    ]
  },
  {
    id: 10,
    question: "이상적인 관계는?",
    answers: [
      { text: "평생 함께할 운명적 만남", goddess: "isis", weight: 1 },
      { text: "서로 성장시키는 동반자", goddess: "maat", weight: 1 },
      { text: "적당한 거리를 유지하는 연인", goddess: "bastet", weight: 1 },
      { text: "매 순간이 특별한 로맨스", goddess: "hathor", weight: 1 }
    ]
  }
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<{[key: string]: number}>({
    isis: 0, hathor: 0, nephthys: 0, bastet: 0,
    nut: 0, maat: 0, neith: 0, serket: 0
  })
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (goddess: string, weight: number) => {
    const newScores = { ...scores }
    newScores[goddess] += weight

    if (currentQuestion < questions.length - 1) {
      setScores(newScores)
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newScores)
    }
  }

  const calculateResult = (finalScores: {[key: string]: number}) => {
    // 가장 높은 점수의 여신 찾기
    let maxScore = 0
    let resultGoddess = 'isis'
    
    Object.entries(finalScores).forEach(([goddess, score]) => {
      // 약간의 랜덤성 추가 (동점 처리 및 다양성)
      const randomBonus = Math.random() * 0.5
      const totalScore = score + randomBonus
      
      if (totalScore > maxScore) {
        maxScore = totalScore
        resultGoddess = goddess
      }
    })
    
    setResult(resultGoddess)
    setShowResult(true)
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setScores({
      isis: 0, hathor: 0, nephthys: 0, bastet: 0,
      nut: 0, maat: 0, neith: 0, serket: 0
    })
    setResult(null)
    setShowResult(false)
  }

  if (showResult && result) {
    const goddess = goddesses[result as keyof typeof goddesses]
    const comp = compatibility[result as keyof typeof compatibility]
    
    return (
      <div className="container result-container">
        <h1>당신의 연애 여신은...</h1>
        <h2 className="god-name">{goddess.name}</h2>
        <div className="image-container">
          <Image 
            src={goddess.image} 
            alt={goddess.name}
            width={300}
            height={300}
            className="god-image"
          />
        </div>
        <h3>{goddess.title}</h3>
        <p className="tag">{goddess.tag}</p>
        <p className="description">{goddess.desc}</p>
        
        <div className="details">
          <div className="detail-item">
            <h4>연애 성격</h4>
            <p>{goddess.personality}</p>
          </div>
          <div className="detail-item">
            <h4>사랑 스타일</h4>
            <p>{goddess.loveStyle}</p>
          </div>
          <div className="detail-item">
            <h4>매력 포인트</h4>
            <p>{goddess.charm}</p>
          </div>
        </div>

        <div className="compatibility">
          <h4>💕 환상의 궁합</h4>
          <div className="gods-list">
            {comp.good.map((godKey, index) => (
              <div key={index} className="god-item">
                <span className="god-name-small">{allGods[godKey as keyof typeof allGods]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="conflict">
          <h4>⚡ 주의가 필요한 상대</h4>
          <div className="gods-list">
            {comp.bad.map((godKey, index) => (
              <div key={index} className="god-item">
                <span className="god-name-small">{allGods[godKey as keyof typeof allGods]}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={resetTest} className="retry-button">
          다시 테스트하기
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>이집트 여신 연애 유형 테스트</h1>
      <p className="subtitle">당신은 어떤 여신의 연애 스타일을 가졌을까요?</p>
      
      {!showResult && (
        <>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          
          <div className="question-container">
            <h2 className="question">
              {questions[currentQuestion].question}
            </h2>
            <div className="answers">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.goddess, answer.weight)}
                  className="answer-button"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
          
          <p className="question-number">
            {currentQuestion + 1} / {questions.length}
          </p>
        </>
      )}
    </div>
  )
}