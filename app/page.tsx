'use client'
import { useState } from 'react'

/* ================= 이미지 매핑 (public/images/egypt-goddess/ 에 파일 존재해야 함) ================= */
const IMG: Record<string,string> = {
  bastet:'bastet.png',
  isis:'isis.jpg',
  maat:'maat.png',
  nephthys:'nephthys.png',
  sekhmet:'sekhmet.png',
  tefnut:'tefnut.png',
  serqet:'serqet.png',
  hathor:'hathor.png',
  anubis:'anubis.png',
  atum:'atum.png',
  hapi:'hapi.png',
  horus:'horus.png',
  osiris:'osiris.png',
  ra:'ra.png',
  set:'set.png',
  thoth:'thoth.png',
  cover:'cover.png'
}
const src = (key:string)=> `/images/egypt-goddess/${IMG[key]}`

/* ================= 타입 ================= */
type Key = 'bastet'|'isis'|'maat'|'nephthys'|'sekhmet'|'tefnut'|'serqet'|'hathor'
type PickRec = { k: Key; w: number; i: number } // 선택한 보기의 여신키/가중치/문항 index

/* ================= 결과 데이터 (풍성한 설명 + 한글 이름 출력 유지) ================= */
const GODDESS: Record<Key, {
  icon:string; name:string; nameEn:string; subtitle:string; tag:string;
  desc:string; personality:string; loveStyle:string; charm:string; tip:string;
  imgKey:string; good: {name:string; key:string}[]; bad: {name:string; key:string}[];
}> = {
  bastet:{
    icon:'🐈', name:'바스테트', nameEn:'Bastet',
    subtitle:'💋 구속은 NO! 매력적인 밀당의 고수',
    tag:'#자유로운영혼 #호기심가득 #분위기메이커',
    desc:'사랑스럽지만 절대 길들여지지 않는 고양이의 여신. 바스테트는 기쁨과 자유, 그리고 자기만의 세계를 지켜내는 존재예요. 애정도, 유혹도, 모두 \'게임처럼\' 즐길 줄 아는 연애의 달인.',
    personality:'인싸력 만렙. 새로움에 끌리고, 늘 주변에 웃음을 퍼뜨립니다. 하지만 때때로 혼자만의 동굴이 필요하죠. 가까이하면 따뜻하지만, 선 넘으면 냉정한 사람.',
    loveStyle:'관심 없는 척하다가도 한순간에 몰입. 하지만 "지금 뭐해?" 같은 구속 멘트엔 바로 식어버림. 관계가 지루해지면 고양이처럼 조용히 사라집니다.',
    charm:'상대는 당신의 \'도도한 여유\'에 중독돼요. "도대체 무슨 생각을 하는 거야?"라는 말, 바로 당신 칭찬이에요.',
    tip:'당신의 자유는 매력이지만, \'무관심\'으로 보일 수도 있어요. 진심이라면 애정 표현은 숨기지 말 것.',
    imgKey:'bastet',
    good:[{name:'토트',key:'thoth'},{name:'호루스',key:'horus'}],
    bad:[{name:'라',key:'ra'},{name:'세트',key:'set'}]
  },
  isis:{
    icon:'🪶', name:'이시스', nameEn:'Isis',
    subtitle:'🌙 끝까지 지켜내는 헌신의 여신',
    tag:'#배려의화신 #따뜻한리더 #신뢰1등',
    desc:'죽은 오시리스를 되살린 사랑의 여신. 이시스는 헌신, 인내, 그리고 보호 본능으로 가득합니다. 사랑을 \'사명\'처럼 여기는 이 시대의 진짜 힐러.',
    personality:'누군가 아프면 먼저 손 내미는 사람. 연인에게는 깊은 위로와 안전함을 줍니다. 하지만 타인의 감정에 너무 몰입하면 자신이 지쳐버리기도 해요.',
    loveStyle:'상대의 행복이 곧 내 행복. 작은 싸움에도 먼저 사과하고, 끝까지 관계를 지키려 합니다. 단, 사랑이 일방적 희생이 되지 않게 조심.',
    charm:'누구와 있어도 편안한 안정감. "이 사람 곁은 안전해"라는 느낌을 줍니다.',
    tip:'모든 걸 안아주려다 지치지 말아요. 가끔은 "나도 돌봄이 필요해요"라고 말할 용기.',
    imgKey:'isis',
    good:[{name:'호루스',key:'horus'},{name:'마아트',key:'maat'}],
    bad:[{name:'세크메트',key:'sekhmet'},{name:'바스테트',key:'bastet'}]
  },
  maat:{
    icon:'⚖️', name:'마아트', nameEn:'Maat',
    subtitle:'💫 사랑에도 룰이 있다, 균형의 달인',
    tag:'#논리적인연인 #이성적인감정가 #균형의달인',
    desc:'세상의 균형을 지탱하는 여신. 마아트는 혼란 속에서도 중심을 잃지 않아요. 연애에서도 늘 \'이성 속의 감성\'을 추구합니다.',
    personality:'감정보다 상황을 먼저 파악하는 타입. 한 번 결정하면 끝까지 신중합니다. 다만 지나친 합리화로 상대의 감정선을 놓칠 수 있어요.',
    loveStyle:'감정싸움보다 대화로 푸는 사람. 연애도 인생의 \'파트너십\'으로 봅니다.',
    charm:'감정의 파도 속에서도 흔들리지 않는 중심. 신뢰와 원칙이 매력 포인트.',
    tip:'사랑에도 정답은 없어요. 가끔은 이성보다 감정으로 움직여보세요.',
    imgKey:'maat',
    good:[{name:'토트',key:'thoth'},{name:'이시스',key:'isis'}],
    bad:[{name:'세트',key:'set'},{name:'네프티스',key:'nephthys'}]
  },
  nephthys:{
    icon:'🌒', name:'네프티스', nameEn:'Nephthys',
    subtitle:'🖤 말보다 눈빛, 신비한 그림자의 여신',
    tag:'#미스터리 #감성깊은사람 #내면형연인',
    desc:'밤과 죽음의 여신이자, 감정의 그늘을 이해하는 존재. 겉보기엔 차분하지만, 속은 누구보다 뜨겁습니다.',
    personality:'말보다 눈빛으로 소통하는 타입. 사람들은 당신을 \'읽기 어려운 매력\'으로 기억합니다.',
    loveStyle:'감정 표현이 서툴지만, 사랑하면 끝까지 지키는 사람. 다만 감정을 너무 숨기면 상대가 불안해할 수도 있어요.',
    charm:'신비로운 매력과 감정의 깊이. 은근한 섹시함과 말없는 온기.',
    tip:'가끔은 감정을 드러내야 사랑이 자랍니다. "괜찮아" 대신 "그때 속상했어"라고 말해보세요.',
    imgKey:'nephthys',
    good:[{name:'아누비스',key:'anubis'},{name:'바스테트',key:'bastet'}],
    bad:[{name:'세크메트',key:'sekhmet'},{name:'라',key:'ra'}]
  },
  sekhmet:{
    icon:'🔥', name:'세크메트', nameEn:'Sekhmet',
    subtitle:'❤️ 불꽃처럼 타오르는 전투형 연애러',
    tag:'#열정폭발 #감정직진 #승부욕러버',
    desc:'태양의 분노이자 치유의 불꽃. 사랑에서도 절대 평범하지 않은 강렬한 존재.',
    personality:'좋아하면 불도저, 싫으면 차갑게 단절. 사랑의 온도차가 극단적입니다.',
    loveStyle:'상대를 압도하지만, 사랑이 식으면 흔적도 남기지 않죠. 당신의 키워드는 "전력 질주".',
    charm:'강한 에너지가 사람을 끌어당깁니다. 카리스마와 자기확신, 뜨거운 진심.',
    tip:'모든 전쟁은 이기지 않아도 됩니다. 때로는 \'지는 연애\'가 진짜 사랑이에요.',
    imgKey:'sekhmet',
    good:[{name:'라',key:'ra'},{name:'바스테트',key:'bastet'}],
    bad:[{name:'마아트',key:'maat'},{name:'네프티스',key:'nephthys'}]
  },
  tefnut:{
    icon:'💧', name:'테프누트', nameEn:'Tefnut',
    subtitle:'🌦 마음의 온도를 조절하는 감정의 조율자',
    tag:'#공감능력끝판왕 #감정통역사 #온도조절기',
    desc:'라의 딸로, 세상에 감정의 흐름을 가져온 존재. 사람의 마음의 온도와 방향을 누구보다 잘 읽습니다.',
    personality:'분위기에 민감하고, 상대의 미묘한 감정 변화를 곧잘 포착하죠. 하지만 남의 감정에 너무 젖으면 자신이 사라질 수 있어요.',
    loveStyle:'사랑을 \'감정의 교류\'로 느끼는 타입. 싸워도 금방 화해하고, 늘 조용히 관계를 회복시킵니다.',
    charm:'상대를 편하게 만들어주는 \'정서적 안정제\'. 따뜻한 공기와 부드러운 리더십.',
    tip:'감정을 너무 흡수하지 말아요. 당신의 기분도 당신 거예요.',
    imgKey:'tefnut',
    good:[{name:'호루스',key:'horus'},{name:'토트',key:'thoth'}],
    bad:[{name:'세트',key:'set'},{name:'세크메트',key:'sekhmet'}]
  },
  serqet:{
    icon:'🦂', name:'세레케트', nameEn:'Serqet',
    subtitle:'🛡 사랑은 신성한 영역, 한 번이면 평생형',
    tag:'#신뢰중시 #단호한사람 #속깊은연인',
    desc:'전갈의 독으로 악을 물리치는 수호 여신. 조용하지만 결단력 있는 타입, 사랑도 \'선\' 안에서는 따뜻합니다.',
    personality:'한 번 마음 열면 깊고 오래가지만, 배신은 절대 못 참아요. "한 번 실망하면 끝"인 사람.',
    loveStyle:'상대가 힘들면 끝까지 지켜주는 든든한 버팀목. 보호본능형이자 책임감 러버.',
    charm:'조용하지만 강한 신뢰감. 믿음직한 사람, 의리의 상징.',
    tip:'당신의 단호함이 때로는 냉정으로 느껴질 수 있어요. 상대에게 "나 여전히 네 편이야"를 자주 알려주세요.',
    imgKey:'serqet',
    good:[{name:'오시리스',key:'osiris'},{name:'마아트',key:'maat'}],
    bad:[{name:'세트',key:'set'},{name:'바스테트',key:'bastet'}]
  },
  hathor:{
    icon:'🌹', name:'하토르', nameEn:'Hathor',
    subtitle:'🎶 사랑을 예술로 만드는 낭만주의자',
    tag:'#낭만주의자 #감정표현왕 #분위기리더',
    desc:'이집트 최고의 사랑 전도사. 하토르는 감정과 미(美)를 다스리며 인간에게 \'즐거움\'을 선물한 여신.',
    personality:'감정선이 풍부하고, 사랑을 예술처럼 표현합니다. 분위기와 감정을 리드하는 천성의 로맨티스트.',
    loveStyle:'연애는 일상이 아닌 \'작품\'. 상대를 행복하게 만드는 게 사랑의 목적.',
    charm:'사랑의 온도와 표현력이 탁월해요. 감성적 매력과 낭만주의.',
    tip:'감정 기복이 클 때는 잠시 거리두기를. 사랑도 쉼표가 필요해요.',
    imgKey:'hathor',
    good:[{name:'토트',key:'thoth'},{name:'이시스',key:'isis'}],
    bad:[{name:'세트',key:'set'},{name:'라',key:'ra'}]
  }
}

/* ================= 질문 12개 (문항은 물음표, 보기(선택지는 진술형) 그대로) ================= */
const Q = [
  ['연애 초반, 당신은?', ['분위기를 리드하며 다정','감정을 숨기고 탐색','헌신적으로 안정 제공','강렬하게 주도']],
  ['사랑이 깊어질수록?', ['감정을 예술처럼','약함을 감싸 지탱','균형과 진실','열정이 뜨거워짐']],
  ['가장 두려운 것?', ['가벼워 보이는 사랑','끝이 보여도 무력함','거짓과 불균형','내 강함이 상처 줌']],
  ['연인을 위해 최선은?', ['행복하게 꾸미기','끝까지 믿고 기다리기','원인 분석 정리','모든 걸 불태우기']],
  ['흔들릴 때 태도?', ['다시 웃게 만들기','운명 믿고 기다림','원인 분석','아프더라도 끝내기']],
  ['이상형 포인트?', ['유머와 따뜻함','침착·신뢰감','명확한 가치관','강렬한 매력']],
  ['연애로 배우는 건?', ['감정의 힘','타인을 사랑하는 법','세상과의 조화','자기 이해']],
  ['사랑이 피어나는 곳?', ['음악·공연·전시','비밀스런 밤','의미 있는 산책','함께 도전']],
  ['사랑을 잃으면?', ['예술로 표현','일상 회복','새 일에 몰두','조용히 멀어짐']],
  ['주변이 보는 나?', ['사랑이 예뻐 보임','묵직하고 진심','이성적이지만 깊음','미스터리']],
  ['연애 목적은?', ['아름다운 기억','서로의 버팀목','진실한 균형','어둠까지 이해']],
  ['한 단어로 사랑은?', ['예술','신념','조화','그림자']]
] as const

/* ================= 보기→여신 매핑 (8여신 전원 고르게 반영) ================= */
const MAP: Key[] = [
  // Q1
  'hathor','nephthys','isis','sekhmet',
  // Q2
  'hathor','isis','maat','sekhmet',
  // Q3
  'hathor','nephthys','maat','sekhmet',
  // Q4
  'hathor','isis','maat','sekhmet',
  // Q5
  'hathor','isis','maat','nephthys',
  // Q6
  'hathor','isis','maat','sekhmet',
  // Q7
  'hathor','isis','maat','nephthys',
  // Q8  ← 자유/감성/균형/직진 분포
  'tefnut','nephthys','maat','sekhmet',
  // Q9
  'hathor','isis','sekhmet','nephthys',
  // Q10
  'hathor','isis','maat','nephthys',
  // Q11
  'maat','hathor','bastet','tefnut',
  // Q12
  'serqet','sekhmet','maat','nephthys'
]

/* ================= 가중치: Q1~Q8(핵심)=2, Q9~Q12(보완)=1 ================= */
const WEIGHT: number[] = [
  // Q1..Q8 (32개)
  2,2,2,2,  2,2,2,2,  2,2,2,2,  2,2,2,2,
  2,2,2,2,  2,2,2,2,  2,2,2,2,  2,2,2,2,
  // Q9..Q12 (16개)
  1,1,1,1,  1,1,1,1,  1,1,1,1,  1,1,1,1
]

/* ================= 페이지 (디자인/동작 보존) ================= */
export default function Page(){
  const [stage, setStage] = useState<'cover'|'name'|'quiz'|'result'>('cover')
  const [userName, setUserName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState<PickRec[]>([])
  const [done,setDone]=useState<Key|null>(null)

  /* ---- 공유 기능 유지 ---- */
  const shareToTwitter = () => {
    const g = done ? GODDESS[done] : null
    if(!g) return
    const text = `나는 ${g.name}! ${g.subtitle}\n이집트 여신으로 알아보는 내 연애 유형`
    const url = window.location.href
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다! 📋')
    } catch {
      alert('링크 복사에 실패했습니다 😢')
    }
  }

  /* ---- 커버 ---- */
  if(stage === 'cover'){
    return (
      <div style={container}>
        <div style={coverCard}>
          <img src={src('cover')} alt="표지" style={coverImg} />
          <button onClick={()=>setStage('name')} style={startBtn}>
            시작하기 ✨
          </button>
        </div>
      </div>
    )
  }

  /* ---- 이름 입력 ---- */
  if(stage === 'name'){
    return (
      <div style={container}>
        <div style={nameCard}>
          <h2 style={nameTitle}>이름을 입력해주세요</h2>
          <p style={nameSubtitle}>결과에 표시됩니다 💕</p>
          <input
            type="text"
            value={nameInput}
            onChange={(e)=>setNameInput(e.target.value)}
            placeholder="홍길동"
            style={nameInputBox}
            maxLength={10}
          />
          <button
            onClick={()=>{
              if(nameInput.trim()){
                setUserName(nameInput.trim())
                setStage('quiz')
              }
            }}
            disabled={!nameInput.trim()}
            style={nameInput.trim() ? nameBtn : nameBtnDisabled}
          >
            테스트 시작
          </button>
        </div>
      </div>
    )
  }

  /* ---- 결과 ---- */
  if(stage === 'result' && done){
    const g = GODDESS[done]
    return (
      <div style={container}>
        <div style={resultCard}>
          {/* 헤더 */}
          <div style={resultHeader}>
            <span style={resultIcon}>{g.icon}</span>
            <h1 style={resultTitle}>{userName}님은</h1>
            <h2 style={resultGoddess}>{g.name}</h2>
            <p style={resultSubtitle}>{g.subtitle}</p>
          </div>

          {/* 이미지 */}
          <img src={src(g.imgKey)} alt={g.name} style={resultImg} />

          {/* 태그 */}
          <p style={resultTag}>{g.tag}</p>

          {/* 본문 섹션 */}
          <div style={contentSection}>
            <h3 style={sectionTitle}>🔮 어떤 여신인가요?</h3>
            <p style={sectionText}>{g.desc}</p>
          </div>
          <div style={contentSection}>
            <h3 style={sectionTitle}>💫 당신은 이런 사람!</h3>
            <p style={sectionText}>{g.personality}</p>
          </div>
          <div style={contentSection}>
            <h3 style={sectionTitle}>💘 당신의 연애 스타일</h3>
            <p style={sectionText}>{g.loveStyle}</p>
          </div>
          <div style={contentSection}>
            <h3 style={sectionTitle}>✨ 매력 포인트</h3>
            <p style={sectionText}>{g.charm}</p>
          </div>
          <div style={contentSection}>
            <h3 style={sectionTitle}>💡 Love Tip</h3>
            <p style={sectionText}>{g.tip}</p>
          </div>

          {/* 궁합 */}
          <div style={matchSection}>
            <h3 style={matchTitle}>💞 잘 맞는 상대</h3>
            <div style={matchGrid}>
              {g.good.map(m => <Match key={m.key} keyName={m.key} label={m.name} good />)}
            </div>
          </div>
          <div style={matchSection}>
            <h3 style={matchTitle}>⚡ 안 맞는 상대</h3>
            <div style={matchGrid}>
              {g.bad.map(m => <Match key={m.key} keyName={m.key} label={m.name} />)}
            </div>
          </div>

          {/* 액션 */}
          <div style={actionSection}>
            <button onClick={()=>{
              setStage('cover')
              setUserName('')
              setNameInput('')
              setStep(0)
              setAns([])
              setDone(null)
            }} style={retryBtn}>
              🔄 다시 하기
            </button>

            <div style={shareButtons}>
              <button onClick={shareToTwitter} style={shareBtn}>
                🐦 트위터 공유
              </button>
              <button onClick={copyLink} style={shareBtn}>
                🔗 링크 복사
              </button>
            </div>

            <button onClick={()=>alert('준비중입니다!')} style={moreBtn}>
              🎭 다른 테스트 해보기
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ---- 퀴즈 ---- */
  const [q, options] = Q[step]
  const pick = (i:number)=>{
    const key = MAP[step*4 + i]
    const w   = WEIGHT[step*4 + i]
    const next = [...ans, { k:key, w, i:step }]
    setAns(next)
    if(step < Q.length-1) setStep(step+1)
    else {
      setDone(getWinner(next))
      setStage('result')
    }
  }

  return (
    <div style={container}>
      <div style={quizCard}>
        <div style={progress}>
          <div style={{...progressBar, width: `${((step+1)/Q.length)*100}%`}} />
        </div>
        <p style={progressText}>질문 {step+1} / {Q.length}</p>
        <h2 style={quizQuestion}>{q}</h2>
        <div style={optionGrid}>
          {options.map((label,idx)=>(
            <button key={idx} onClick={()=>pick(idx)} style={option}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================= 결과 산정: 가중치 반영 + 최근기여 타이브레이커 (랜덤 없음) ================= */
function getWinner(a:PickRec[]):Key{
  const s:Record<Key,number>={bastet:0,isis:0,maat:0,nephthys:0,sekhmet:0,tefnut:0,serqet:0,hathor:0}
  a.forEach(p=>{ s[p.k]+=p.w })
  let max = Math.max(...Object.values(s))
  let cands = (Object.entries(s) as [Key,number][])
                .filter(([,v])=>v===max)
                .map(([k])=>k)
  if(cands.length>1){
    const recentScore = (g:Key)=>a.reduce((acc,p)=>acc+(p.k===g ? (p.i+1)*p.w : 0),0)
    const best = Math.max(...cands.map(recentScore))
    cands = cands.filter(g=>recentScore(g)===best)
  }
  cands.sort() // 안정적 결정
  return cands[0]
}

/* ================= 궁합 아바타 ================= */
function Match({keyName, label, good}:{keyName:string; label:string; good?:boolean}){
  return (
    <div style={matchItem}>
      <img
        src={src(keyName)}
        alt={label}
        style={{ ...matchImg, border: `4px solid ${good ? '#ffc5d9' : '#d4a5ff'}` }}
      />
      <div style={matchName}>{label}</div>
    </div>
  )
}

/* ================= 스타일 (그대로 유지) ================= */
const container:React.CSSProperties={
  minHeight:'100vh',
  background:'linear-gradient(135deg, #ffeef8 0%, #fff4e6 50%, #e8f4ff 100%)',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  padding:'20px'
}

const coverCard:React.CSSProperties={
  background:'white',
  borderRadius:24,
  padding:0,
  maxWidth:600,
  width:'100%',
  boxShadow:'0 8px 32px rgba(0,0,0,0.12)',
  overflow:'hidden'
}

const coverImg:React.CSSProperties={
  width:'100%',
  display:'block',
  borderRadius:'24px 24px 0 0'
}

const startBtn:React.CSSProperties={
  width:'calc(100% - 40px)',
  margin:'20px',
  padding:'18px',
  fontSize:20,
  fontWeight:'bold',
  background:'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  color:'white',
  border:'none',
  borderRadius:16,
  cursor:'pointer',
  boxShadow:'0 4px 16px rgba(255,154,158,0.4)'
}

const nameCard:React.CSSProperties={
  background:'white',
  borderRadius:24,
  padding:40,
  maxWidth:440,
  width:'100%',
  boxShadow:'0 8px 32px rgba(0,0,0,0.12)',
  textAlign:'center'
}

const nameTitle:React.CSSProperties={
  fontSize:28,
  fontWeight:'bold',
  margin:'0 0 8px',
  background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip:'text',
  WebkitTextFillColor:'transparent'
}

const nameSubtitle:React.CSSProperties={
  fontSize:16,
  color:'#999',
  margin:'0 0 32px'
}

const nameInputBox:React.CSSProperties={
  width:'100%',
  padding:'16px 20px',
  fontSize:18,
  border:'2px solid #ffd6e7',
  borderRadius:12,
  outline:'none',
  textAlign:'center',
  marginBottom:20,
  boxSizing:'border-box'
}

const nameBtn:React.CSSProperties={
  width:'100%',
  padding:'16px',
  fontSize:18,
  fontWeight:'bold',
  background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color:'white',
  border:'none',
  borderRadius:12,
  cursor:'pointer'
}

const nameBtnDisabled:React.CSSProperties={
  ...nameBtn,
  background:'#ddd',
  cursor:'not-allowed'
}

const quizCard:React.CSSProperties={
  background:'white',
  borderRadius:24,
  padding:'32px 28px',
  maxWidth:560,
  width:'100%',
  boxShadow:'0 8px 32px rgba(0,0,0,0.12)'
}

const progress:React.CSSProperties={
  height:8,
  background:'#f0f0f0',
  borderRadius:999,
  overflow:'hidden',
  marginBottom:12
}

const progressBar:React.CSSProperties={
  height:'100%',
  background:'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
  transition:'width 0.3s ease'
}

const progressText:React.CSSProperties={
  fontSize:14,
  color:'#999',
  textAlign:'center',
  margin:'0 0 24px'
}

const quizQuestion:React.CSSProperties={
  fontSize:22,
  fontWeight:'bold',
  color:'#333',
  marginBottom:24,
  lineHeight:1.4
}

const optionGrid:React.CSSProperties={
  display:'grid',
  gap:12
}

const option:React.CSSProperties={
  padding:'18px 20px',
  fontSize:16,
  textAlign:'left',
  background:'linear-gradient(135deg, #ffeef8 0%, #fff9e6 100%)',
  border:'2px solid transparent',
  borderRadius:16,
  cursor:'pointer',
  transition:'all 0.2s',
  fontWeight:'500',
  color:'#444'
}

const resultCard:React.CSSProperties={
  background:'white',
  borderRadius:24,
  padding:'40px 32px',
  maxWidth:640,
  width:'100%',
  boxShadow:'0 8px 32px rgba(0,0,0,0.12)'
}

const resultHeader:React.CSSProperties={
  textAlign:'center',
  marginBottom:32
}

const resultIcon:React.CSSProperties={
  fontSize:48,
  display:'block',
  marginBottom:12
}

const resultTitle:React.CSSProperties={
  fontSize:22,
  fontWeight:'600',
  color:'#666',
  margin:'0 0 8px'
}

const resultGoddess:React.CSSProperties={
  fontSize:42,
  fontWeight:'bold',
  margin:'0 0 12px',
  background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip:'text',
  WebkitTextFillColor:'transparent'
}

const resultSubtitle:React.CSSProperties={
  fontSize:18,
  color:'#ff6b9d',
  fontWeight:'600',
  margin:0
}

const resultImg:React.CSSProperties={
  width:'100%',
  maxWidth:280,
  height:280,
  borderRadius:'50%',
  objectFit:'cover',
  border:'6px solid #ffe0f0',
  boxShadow:'0 8px 24px rgba(0,0,0,0.15)',
  display:'block',
  margin:'0 auto 24px'
}

const resultTag:React.CSSProperties={
  fontSize:15,
  color:'#999',
  textAlign:'center',
  marginBottom:32
}

const contentSection:React.CSSProperties={
  marginBottom:28,
  paddingBottom:28,
  borderBottom:'1px solid #f0f0f0'
}

const sectionTitle:React.CSSProperties={
  fontSize:18,
  fontWeight:'bold',
  color:'#333',
  marginBottom:12
}

const sectionText:React.CSSProperties={
  fontSize:15,
  lineHeight:1.8,
  color:'#555',
  margin:0
}

const matchSection:React.CSSProperties={
  marginBottom:32,
  textAlign:'center'
}

const matchTitle:React.CSSProperties={
  fontSize:20,
  fontWeight:'bold',
  marginBottom:16,
  color:'#333'
}

const matchGrid:React.CSSProperties={
  display:'flex',
  justifyContent:'center',
  gap:20,
  flexWrap:'wrap'
}

const matchItem:React.CSSProperties={
  textAlign:'center'
}

const matchImg:React.CSSProperties={
  width:90,
  height:90,
  borderRadius:'50%',
  objectFit:'cover',
  marginBottom:8
}

const matchName:React.CSSProperties={
  fontSize:14,
  fontWeight:'600',
  color:'#555'
}

const actionSection:React.CSSProperties={
  display:'flex',
  flexDirection:'column',
  gap:16,
  marginTop:40,
  paddingTop:32,
  borderTop:'2px solid #f0f0f0'
}

const retryBtn:React.CSSProperties={
  padding:'16px',
  fontSize:16,
  fontWeight:'bold',
  background:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  color:'#333',
  border:'none',
  borderRadius:12,
  cursor:'pointer',
  boxShadow:'0 4px 16px rgba(168,237,234,0.3)'
}

const shareButtons:React.CSSProperties={
  display:'flex',
  gap:12
}

const shareBtn:React.CSSProperties={
  flex:1,
  padding:'14px',
  fontSize:15,
  fontWeight:'600',
  background:'white',
  color:'#667eea',
  border:'2px solid '#667eea',
  borderRadius:12,
  cursor:'pointer'
}

const moreBtn:React.CSSProperties={
  padding:'14px',
  fontSize:15,
  fontWeight:'600',
  background:'white',
  color:'#ff6b9d',
  border:'2px solid #ff6b9d',
  borderRadius:12,
  cursor:'pointer'
}
