'use client'
import { useState } from 'react'
import Image from 'next/image'
import './globals.css'

// 8개 여신 정의 (디자인/이미지 경로 그대로)
const goddesses = {
  isis: {
    name: '이시스',
    title: '신비로운 치유자, 영혼의 연인',
    tag: '#깊은사랑 #헌신적 #영적교감',
    desc: '마법과 치유의 대여신. 깊은 통찰력과 치유의 힘으로 진정한 사랑을 추구합니다.',
    personality: '겉으로는 조용하지만 사랑하는 사람에게는 무한한 헌신. 영혼의 연결을 중시해요.',
    loveStyle: '한 사람과 깊고 진실된 관계. 서로의 상처까지 치유하는 사랑.',
    charm: '신비로운 분위기와 깊은 공감 능력. 당신과 있으면 마음이 편안해져요.',
    image: '/isis.jpg'
  },
  hathor: {
    name: '하토르',
    title: '사랑의 전도사, 기쁨의 여신',
    tag: '#애정표현甲 #긍정에너지 #로맨티스트',
    desc: '사랑과 기쁨의 여신. 매일이 축제처럼 사랑을 즐겁게 표현합니다.',
    personality: '사랑한다는 말을 아끼지 않아요. 상대방을 행복하게 만드는 게 내 행복!',
    loveStyle: '매일 특별한 날로 만드는 로맨틱한 연애. 적극적인 애정표현.',
    charm: '밝고 따뜻한 에너지. 함께 있으면 세상이 아름다워 보여요.',
    image: '/hathor.jpg'
  },
  nephthys: {
    name: '네프티스',
    title: '어둠의 수호자, 비밀스런 연인',
    tag: '#신비주의 #내면깊음 #감성충만',
    desc: '밤과 그림자의 여신. 조용하지만 깊은 감성으로 은밀한 사랑을 추구합니다.',
    personality: '말보다 눈빛으로 대화해요. 소수와 깊은 관계를 맺는 타입.',
    loveStyle: '비밀스럽고 은밀한 사랑. 둘만의 특별한 세계를 만들어요.',
    charm: '미스터리한 매력. 알면 알수록 빠져드는 깊은 매력.',
    image: '/nephthys.jpg'
  },
  bastet: {
    name: '바스테트',
    title: '독립적인 수호자, 자유로운 연인',
    tag: '#독립적 #츤데레 #보호본능',
    desc: '고양이와 가정의 여신. 독립적이면서도 사랑하는 이를 지키는 수호자.',
    personality: '혼자 있는 시간도 중요해요. 하지만 내 사람은 끝까지 지킵니다.',
    loveStyle: '적당한 거리를 유지하면서도 필요할 때는 든든한 연애.',
    charm: '고양이같은 매력. 도도하면서도 은근히 다정해요.',
    image: '/bastet.jpg'
  },
  nut: {
    name: '누트',
    title: '무한한 포용력, 우주적 사랑',
    tag: '#포용력 #자유영혼 #예술적감성',
    desc: '하늘과 별의 여신. 무한한 우주처럼 넓은 마음으로 상대를 포용합니다.',
    personality: '자유롭고 예술적이에요. 사랑도 우주처럼 무한하고 경계가 없어요.',
    loveStyle: '서로의 개성을 존중하는 자유로운 사랑. 속박하지 않는 관계.',
    charm: '예술적이고 몽환적인 매력. 함께 있으면 영감이 샘솟아요.',
    image: '/nut.jpg'
  },
  maat: {
    name: '마아트',
    title: '진실된 연인, 정의로운 파트너',
    tag: '#정직함 #신뢰 #균형잡힌사랑',
    desc: '진리와 정의의 여신. 거짓 없는 진실된 사랑, 공정한 관계를 추구합니다.',
    personality: '정직이 최고의 미덕. 신뢰를 바탕으로 한 투명한 관계를 원해요.',
    loveStyle: '평등하고 균형잡힌 관계. 서로 존중하는 성숙한 사랑.',
    charm: '믿음직스러운 매력. 당신과 있으면 안정감을 느껴요.',
    image: '/maat.jpg'
  },
  neith: {
    name: '네이트',
    title: '전사의 연인, 강인한 수호자',
    tag: '#강한여성 #보호본능 #독립적',
    desc: '전쟁과 사냥의 여신. 스스로 강하면서도 사랑하는 이를 지키는 전사.',
    personality: '강하고 독립적이에요. 연약한 모습은 오직 사랑하는 사람에게만.',
    loveStyle: '평등한 파트너십. 서로를 지켜주는 전우같은 연애.',
    charm: '강인하면서도 섬세한 매력. 든든한 파트너.',
    image: '/neith.jpg'
  },
  serket: {
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
  // 남신 10명 (표시용)
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

// 궁합 데이터 (그대로)
const compatibility = {
  isis: { good: ['osiris', 'thoth', 'horus'], bad: ['seth', 'sobek'] },
  hathor: { good: ['horus', 'ra', 'bes'], bad: ['anubis', 'seth'] },
  nephthys: { good: ['anubis', 'osiris', 'seth'], bad: ['ra', 'hathor'] },
  bastet: { good: ['ptah', 'thoth', 'geb'], bad: ['sobek', 'seth'] },
  nut: { good: ['geb', 'thoth', 'ptah'], bad: ['ra', 'sobek'] },
  maat: { good: ['thoth', 'osiris', 'horus'], bad: ['seth', 'sobek'] },
  neith: { good: ['ptah', 'horus', 'ra'], bad: ['seth', 'bes'] },
  serket: { good: ['anubis', 'seth', 'horus'], bad: ['bes', 'hathor'] }
}

// 더 자연스럽고 풍부한 12문항 (디자인·UI 변경 없음)
const questions = [
  {
    id: 1,
    question: '이상적인 데이트 장면에 더 끌리는 건?',
    answers: [
      { text: '사람 없는 작은 바(Bar)에서 낮은 목소리로 깊은 대화', goddess: 'nephthys', weight: 2 },
      { text: '라이브 밴드가 있는 페스티벌, 춤추고 웃으며 밤새기', goddess: 'hathor', weight: 2 },
      { text: '미술관·천문대·북스테이 같은 감성 코스 탐험', goddess: 'nut', weight: 2 },
      { text: '집에서 같이 요리하고 영화 보는 잔잔한 밤', goddess: 'bastet', weight: 2 }
    ]
  },
  {
    id: 2,
    question: '갈등이 생기면 나는 보통 이렇게 한다',
    answers: [
      { text: '서로의 상처를 먼저 어루만져 주며 마음부터 다독임', goddess: 'isis', weight: 2 },
      { text: '사실·원인·대안을 차분히 정리해서 합의점 찾기', goddess: 'maat', weight: 2 },
      { text: '시간을 두고 감정이 가라앉을 때 다시 이야기', goddess: 'bastet', weight: 2 },
      { text: '오해가 생기지 않게 즉시 직진으로 솔직 대화', goddess: 'serket', weight: 2 }
    ]
  },
  {
    id: 3,
    question: '내가 사랑을 표현하는 기본 톤',
    answers: [
      { text: '말·스킨십·작은 이벤트로 매일 티 내기', goddess: 'hathor', weight: 2 },
      { text: '실행력으로 증명: 문제 해결·보호·지원', goddess: 'neith', weight: 2 },
      { text: '깊은 공감과 케어: 듣고 기억하고 보듬기', goddess: 'isis', weight: 2 },
      { text: '특별한 순간에만 조심스레 꺼내는 진심', goddess: 'nephthys', weight: 2 }
    ]
  },
  {
    id: 4,
    question: '연애의 핵심 가치 하나만 고르라면',
    answers: [
      { text: '서로의 자유와 개성을 끝까지 존중', goddess: 'nut', weight: 2 },
      { text: '정직·신뢰·공정함이 흔들리지 않는 관계', goddess: 'maat', weight: 2 },
      { text: '강렬함과 몰입, 서로에게 유일한 존재', goddess: 'serket', weight: 2 },
      { text: '안정감·루틴·일상의 포근함', goddess: 'bastet', weight: 2 }
    ]
  },
  {
    id: 5,
    question: '이별 직후의 나는',
    answers: [
      { text: '혼자서 조용히 흔적을 정리하고 마음을 치유', goddess: 'nephthys', weight: 2 },
      { text: '친구들과 웃고 떠들며 에너지를 다시 채움', goddess: 'hathor', weight: 2 },
      { text: '현실적으로 정리: 배운 점 메모하고 다음으로', goddess: 'neith', weight: 2 },
      { text: '끝난 건 끝. 선을 긋고 뒤돌아보지 않음', goddess: 'serket', weight: 2 }
    ]
  },
  {
    id: 6,
    question: '연인에게 가장 바라는 한 가지',
    answers: [
      { text: '말하지 않아도 전해지는 영혼의 교감', goddess: 'isis', weight: 2 },
      { text: '매일이 조금씩 즐거워지는 긍정 에너지', goddess: 'hathor', weight: 2 },
      { text: '투명함과 약속, 균형 잡힌 파트너십', goddess: 'maat', weight: 2 },
      { text: '적당한 거리와 각자의 시간 존중', goddess: 'bastet', weight: 2 }
    ]
  },
  {
    id: 7,
    question: '질투가 올라올 때의 반응',
    answers: [
      { text: '겉으로 내색 안 하고 내 안에서 해소', goddess: 'nephthys', weight: 2 },
      { text: '사실만 묻고 감정은 차분히 표현', goddess: 'maat', weight: 2 },
      { text: '선을 넘으면 단호. 내 사람은 내가 지킨다', goddess: 'serket', weight: 2 },
      { text: '한 번 더 믿어 보기. 큰 흐름을 본다', goddess: 'nut', weight: 2 }
    ]
  },
  {
    id: 8,
    question: '사랑에 빠진 나를 한 문장으로',
    answers: [
      { text: '“당신의 안식처가 되어 줄게”', goddess: 'isis', weight: 2 },
      { text: '“오늘도 네가 즐거웠으면 좋겠어”', goddess: 'hathor', weight: 2 },
      { text: '“내가 지킬게, 걱정 말아”', goddess: 'neith', weight: 2 },
      { text: '“나에게는 너 하나면 충분해”', goddess: 'serket', weight: 2 }
    ]
  },
  {
    id: 9,
    question: '연애할 때 내가 맡는 역할에 가깝다',
    answers: [
      { text: '든든한 보호자·문제 해결사', goddess: 'neith', weight: 1 },
      { text: '상담가·치유자·감정 번역기', goddess: 'isis', weight: 1 },
      { text: '분위기 메이커·축제 진행자', goddess: 'hathor', weight: 1 },
      { text: '영감 주는 뮤즈·아이디어 뱅크', goddess: 'nut', weight: 1 }
    ]
  },
  {
    id: 10,
    question: '이상적인 관계의 그림',
    answers: [
      { text: '운명 같은 한 사람과 평생 동행', goddess: 'isis', weight: 1 },
      { text: '서로를 성장시키는 공평한 파트너', goddess: 'maat', weight: 1 },
      { text: '가까우면서도 숨 쉴 틈이 있는 연인', goddess: 'bastet', weight: 1 },
      { text: '매 순간이 이벤트처럼 반짝이는 로맨스', goddess: 'hathor', weight: 1 }
    ]
  },
  {
    id: 11,
    question: '아침 첫 메시지를 보낸다면',
    answers: [
      { text: '“오늘도 우리 약속 잊지 말자, 저녁에 이야기 이어가자”', goddess: 'maat', weight: 1 },
      { text: '“굿모닝 ☀︎ 오늘 재미있는 일 하나 만들자”', goddess: 'hathor', weight: 1 },
      { text: '“오후엔 각자 시간 보내고 밤에 같이 쉬자”', goddess: 'bastet', weight: 1 },
      { text: '“주말에 별 보러 짧게 떠날래?”', goddess: 'nut', weight: 1 }
    ]
  },
  {
    id: 12,
    question: '상대가 가장 좋아할 선물 하나',
    answers: [
      { text: '손편지+티 블렌딩 세트, 정성 한가득', goddess: 'isis', weight: 1 },
      { text: '멀티툴·러닝화 같은 실용템', goddess: 'neith', weight: 1 },
      { text: '평소에 눈여겨본 강렬한 포인트 아이템', goddess: 'serket', weight: 1 },
      { text: '그 사람만 알 수 있는 취향의 책·향', goddess: 'nephthys', weight: 1 }
    ]
  }
]

type ScoreMap = { [key: string]: number }
type Pick = { g: string; w: number; i: number }

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<ScoreMap>({
    isis: 0, hathor: 0, nephthys: 0, bastet: 0,
    nut: 0, maat: 0, neith: 0, serket: 0
  })
  const [history, setHistory] = useState<Pick[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (goddess: string, weight: number) => {
    const newScores = { ...scores }
    newScores[goddess] += weight

    const nextHistory = [...history, { g: goddess, w: weight, i: currentQuestion }]

    if (currentQuestion < questions.length - 1) {
      setScores(newScores)
      setHistory(nextHistory)
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newScores, nextHistory)
    }
  }

  // 결과 계산: 랜덤 제거 + 동점 안정 해소
  const calculateResult = (finalScores: ScoreMap, picks: Pick[]) => {
    // 1) 최고 점수
    const maxScore = Math.max(...Object.values(finalScores))
    let candidates = Object.entries(finalScores)
      .filter(([_, s]) => s === maxScore)
      .map(([k]) => k)

    // 2) 가중치 2 득점이 많은 후보 우선
    if (candidates.length > 1) {
      const weight2Count = (g: string) => picks.filter(p => p.g === g && p.w === 2).length
      const maxW2 = Math.max(...candidates.map(weight2Count))
      candidates = candidates.filter(g => weight2Count(g) === maxW2)
    }

    // 3) 더 최근(뒤쪽 문항)에서 결정적 선택을 더 많이 받은 후보 우선
    if (candidates.length > 1) {
      const recentScore = (g: string) =>
        picks
          .filter(p => p.g === g)
          .reduce((acc, p) => acc + (p.i + 1) * p.w, 0) // 뒤쪽 문항일수록 가중
      const maxRecent = Math.max(...candidates.map(recentScore))
      candidates = candidates.filter(g => recentScore(g) === maxRecent)
    }

    // 4) 마지막 타이브레이커: 알파벳 키 정렬로 안정적 선택
    candidates.sort()
    const resultGoddess = candidates[0] || 'isis'

    setResult(resultGoddess)
    setShowResult(true)
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setScores({
      isis: 0, hathor: 0, nephthys: 0, bastet: 0,
      nut: 0, maat: 0, neith: 0, serket: 0
    })
    setHistory([])
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
