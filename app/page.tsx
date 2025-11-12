'use client'
import { useState } from 'react'

/* ========== 이미지 경로 ========== */
const IMG: Record<string, string> = {
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

/* ========== 타입 ========== */
type Key = 'bastet'|'isis'|'maat'|'nephthys'|'sekhmet'|'tefnut'|'serqet'|'hathor'

/* ========== 얼굴 크게 보이는 아바타 ========== */
type AvatarProps = {
  imgKey:string
  size:number
  ringColor:string
  ringWidth?:number
  zoom?:number          // 1.0 = 원본, 1.4 = 40% 확대
  focus?:string         // '50% 20%' 같은 background-position
}
function Avatar({imgKey,size,ringColor,ringWidth=6,zoom=1.35,focus='50% 22%'}:AvatarProps){
  return (
    <div
      style={{
        width:size,height:size,borderRadius:'50%',
        border:`${ringWidth}px solid ${ringColor}`,
        boxShadow:'0 8px 24px rgba(0,0,0,.12)',
        backgroundImage:`url(${src(imgKey)})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:focus,           // 얼굴 쪽으로 포커스
        backgroundSize:`${zoom*100}%`,      // 확대
        backgroundColor:'#fff'
      }}
      aria-label={imgKey}
    />
  )
}

/* ========== 결과 데이터(코멘트 줄바꿈 포함) ========== */
const GODDESS: Record<Key, {
  icon:string; name:string; nameEn:string; subtitle:string; tag:string;
  desc:string; personality:string; loveStyle:string; charm:string; tip:string;
  imgKey:string;
  good: {name:string; key:string; desc:string}[];
  bad: {name:string; key:string; desc:string}[];
}> = {
  bastet:{
    icon:'🐈', name:'바스테트', nameEn:'Bastet',
    subtitle:'💋 구속은 NO! 매력적인 밀당의 고수',
    tag:'#자유로운영혼 #호기심가득 #분위기메이커',
    desc:'사랑스럽지만 절대 길들여지지 않는 고양이의 여신. 기쁨과 자유, 그리고 자기만의 세계를 지켜냅니다.',
    personality:'새로움에 끌리고 주변에 웃음을 퍼뜨리지만 혼자만의 동굴도 필요해요. 선을 넘으면 단호해집니다.',
    loveStyle:'관심 없는 듯하다가도 한순간 몰입. 하지만 구속 느낌에는 속도가 식어요.',
    charm:'도도한 여유와 포근함이 공존. “무슨 생각을 하는 거야?”가 곧 칭찬.',
    tip:'자유와 무관심은 달라요. 진심이라면 신호를 분명히!',
    imgKey:'bastet',
    good:[
      {name:'토트',key:'thoth',desc:'지혜로운 관찰자\n과몰입이 없어 편안함'},
      {name:'호루스',key:'horus',desc:'책임감 리더\n든든한 보호자'}
    ],
    bad:[
      {name:'라',key:'ra',desc:'태양신 리더십\n내 자유에 간섭'},
      {name:'세트',key:'set',desc:'혼돈의 파워\n긴장 유발'}
    ]
  },
  isis:{
    icon:'🪶', name:'이시스', nameEn:'Isis',
    subtitle:'🌙 끝까지 지켜내는 헌신의 여신',
    tag:'#배려의화신 #따뜻한리더 #신뢰1등',
    desc:'죽은 오시리스를 되살린 사랑의 여신. 헌신과 인내, 보호 본능으로 관계를 지탱합니다.',
    personality:'아픈 사람을 보면 먼저 손 내미는 타입. 감정에 과몰입하면 스스로 지칠 수 있어요.',
    loveStyle:'상대의 행복이 곧 내 행복. 다만 일방적 희생이 되지 않게 조심.',
    charm:'곁에 있으면 마음이 편안해지는 안정감.',
    tip:'“나도 돌봄이 필요해요”라고 말할 용기도 사랑.',
    imgKey:'isis',
    good:[
      {name:'호루스',key:'horus',desc:'안전과 책임\n보호자형'},
      {name:'마아트',key:'maat',desc:'원칙+대화\n관계 안정'}
    ],
    bad:[
      {name:'세크메트',key:'sekhmet',desc:'뜨거운 전투형\n감정 소모'},
      {name:'바스테트',key:'bastet',desc:'자유 우선\n정서적 격차'}
    ]
  },
  maat:{
    icon:'⚖️', name:'마아트', nameEn:'Maat',
    subtitle:'💫 사랑에도 룰이 있다, 균형의 달인',
    tag:'#논리적인연인 #이성적인감정가 #균형의달인',
    desc:'세상의 균형을 지탱하는 여신. 혼란 속에서도 중심을 잃지 않고, 연애에서도 “이성 속의 감성”을 추구합니다.',
    personality:'상황을 먼저 파악하고 신중히 결정. 지나친 합리화로 감정선을 놓칠 수 있어요.',
    loveStyle:'감정싸움보다 대화와 합의. 연애를 인생의 파트너십으로 봅니다.',
    charm:'흔들리지 않는 중심과 신뢰.',
    tip:'사랑엔 정답이 하나가 아니에요. 가끔은 감정으로 움직여보세요.',
    imgKey:'maat',
    good:[
      {name:'토트',key:'thoth',desc:'이성의 조력\n대화가 잘 통함'},
      {name:'이시스',key:'isis',desc:'돌봄과 원칙\n균형 잡힘'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'규칙 파괴\n갈등 유발'},
      {name:'네프티스',key:'nephthys',desc:'침묵형\n소통 답답'}
    ]
  },
  nephthys:{
    icon:'🌒', name:'네프티스', nameEn:'Nephthys',
    subtitle:'🖤 말보다 눈빛, 신비한 그림자의 여신',
    tag:'#미스터리 #감성깊은사람 #내면형연인',
    desc:'감정의 그늘을 이해하는 밤의 여신. 겉은 차분하지만 속은 뜨거운 타입.',
    personality:'말수는 적어도 눈빛이 많은 걸 말해요. “읽기 어려운 매력”이 특징.',
    loveStyle:'표현은 서툴러도 지키면 오래 지킵니다. 너무 숨기면 상대가 불안할 수 있어요.',
    charm:'신비로움과 깊이, 말없는 온기.',
    tip:'“괜찮아” 대신 “그때 속상했어” 같은 감정 언어를 꺼내보기.',
    imgKey:'nephthys',
    good:[
      {name:'아누비스',key:'anubis',desc:'조용한 이해\n깊은 신뢰'},
      {name:'바스테트',key:'bastet',desc:'도도+내면\n서로의 거리 존중'}
    ],
    bad:[
      {name:'세크메트',key:'sekhmet',desc:'감정 폭발\n상처 위험'},
      {name:'라',key:'ra',desc:'과한 광명\n피곤함'}
    ]
  },
  sekhmet:{
    icon:'🔥', name:'세크메트', nameEn:'Sekhmet',
    subtitle:'❤️ 불꽃처럼 타오르는 전투형 연애러',
    tag:'#열정폭발 #감정직진 #승부욕러버',
    desc:'태양의 분노이자 치유의 불꽃. 사랑에서도 평범을 거부하는 강렬한 존재.',
    personality:'좋아하면 불도저, 식으면 단칼. 온도차가 극단적.',
    loveStyle:'전력 질주형. 그러나 소진되기 쉬워요.',
    charm:'카리스마, 자기확신, 뜨거운 진심.',
    tip:'모든 전쟁을 이길 필요는 없어요. 때로는 져주는 용기가 사랑.',
    imgKey:'sekhmet',
    good:[
      {name:'라',key:'ra',desc:'공명하는 태양\n에너지 상승'},
      {name:'바스테트',key:'bastet',desc:'쿨한 거리\n속도조절 도움'}
    ],
    bad:[
      {name:'마아트',key:'maat',desc:'규칙·절제\n답답함'},
      {name:'네프티스',key:'nephthys',desc:'내향·침묵\n오해 커짐'}
    ]
  },
  tefnut:{
    icon:'💧', name:'테프누트', nameEn:'Tefnut',
    subtitle:'🌦 마음의 온도를 조절하는 감정의 조율자',
    tag:'#공감능력끝판왕 #감정통역사 #온도조절기',
    desc:'세상에 감정의 흐름을 가져온 존재. 분위기와 마음의 온도를 정교하게 읽습니다.',
    personality:'타인의 감정에 민감. 과흡수하면 내가 사라질 수 있어요.',
    loveStyle:'싸워도 금방 화해하고 관계를 회복시키는 타입.',
    charm:'정서적 안정제 같은 따뜻함.',
    tip:'남의 감정에 잠기지 말 것. 내 기분을 먼저 체크!',
    imgKey:'tefnut',
    good:[
      {name:'호루스',key:'horus',desc:'안정적인 기류\n배려 깊음'},
      {name:'토트',key:'thoth',desc:'분석과 조율\n싸움 완화'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'거친 돌파\n감정 무시'},
      {name:'세크메트',key:'sekhmet',desc:'불꽃형\n온도 차 큼'}
    ]
  },
  serqet:{
    icon:'🦂', name:'세레케트', nameEn:'Serqet',
    subtitle:'🛡 사랑은 신성한 영역, 한 번이면 평생형',
    tag:'#신뢰중시 #단호한사람 #속깊은연인',
    desc:'전갈의 독으로 악을 물리치는 수호 여신. 경계 안에서는 따뜻하고 깊습니다.',
    personality:'배신을 못 참는 단호함. 한 번 열면 오래 갑니다.',
    loveStyle:'끝까지 지켜주는 버팀목. 책임감 강함.',
    charm:'조용하지만 강한 신뢰감.',
    tip:'단호함이 냉정으로 보이지 않게 “나는 네 편” 신호를 주기.',
    imgKey:'serqet',
    good:[
      {name:'오시리스',key:'osiris',desc:'의리·책임\n신뢰형'},
      {name:'마아트',key:'maat',desc:'원칙과 경계\n서로 존중'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'선 넘는 파괴\n불신'},
      {name:'바스테트',key:'bastet',desc:'자유 우선\n경계 충돌'}
    ]
  },
  hathor:{
    icon:'🌹', name:'하토르', nameEn:'Hathor',
    subtitle:'🎶 사랑을 예술로 만드는 낭만주의자',
    tag:'#낭만주의자 #감정표현왕 #분위기리더',
    desc:'감정과 미를 다스리는 사랑 전도사. 사랑을 예술처럼 표현합니다.',
    personality:'감정선이 풍부하고 분위기 리드가 자연스러움.',
    loveStyle:'상대를 행복하게 만드는 게 목적. 연애는 작품.',
    charm:'표현력과 감성의 온도.',
    tip:'기복이 클 땐 잠시 쉼표를.',
    imgKey:'hathor',
    good:[
      {name:'토트',key:'thoth',desc:'센스 있는 서포트\n예술적 대화'},
      {name:'이시스',key:'isis',desc:'따뜻한 돌봄\n감정 합'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'분위기 파괴\n감정 무딤'},
      {name:'라',key:'ra',desc:'일 중심\n로맨스 식음'}
    ]
  }
}

/* ========== 질문(12) — 네가 준 버전 그대로 ========== */
const Q = [
  ['어떤 데이트가 가장 끌려?', ['사람 적은 바에서 깊은 대화','감정을 숨기고 천천히 탐색','처음부터 안정과 돌봄 제공','강렬하게 리드하며 직진']],
  ['갈등이 생기면 어떻게 풀어?', ['먼저 공감하며 감정을 다독임','사실과 원인을 정리해 합의점 찾음','시간을 두고 진정 후 다시 대화','오해 없게 즉시 솔직하게 직진 대화']],
  ['너의 애정 표현 방식은?', ['작은 이벤트·스킨십으로 자주 표현','행동으로 증명(보호·문제 해결)','깊은 공감과 케어로 보듬음','특별한 순간에만 조심스레 전달']],
  ['연애에서 가장 중요한 가치는 뭐야?', ['자유와 개성 존중','정직·신뢰·공정','강렬함과 몰입, 유일성','안정감·루틴·일상의 포근함']],
  ['흔들릴 때 너의 태도는?', ['다시 웃게 만들기부터 시도','운명을 믿고 조용히 기다림','원인 분석으로 구조 잡기','아프더라도 필요한 선 긋기']],
  ['이상형의 핵심 포인트는?', ['유머와 따뜻함','침착함과 신뢰감','명확한 가치관','강렬한 매력과 추진력']],
  ['연애를 통해 배우는 건?', ['감정의 힘과 표현','타인을 사랑하는 법','세상과의 조화와 룰','자기 이해와 한계 인식']],
  ['사랑이 가장 잘 피어나는 공간은?', ['음악·공연·전시 같은 감성 코스','비밀스럽고 조용한 밤의 분위기','의미 있는 산책과 대화','함께 도전하는 액티브한 자리']],
  ['사랑을 잃으면 보통 어떻게 해?', ['예술이나 기록으로 소화','루틴을 회복하며 일상 정비','새 일에 몰두하며 재정비','조용히 멀어지며 감정 정리']],
  ['사람들이 보는 너의 연애 이미지는?', ['사랑이 예쁘고 생동감 있음','묵직하고 진심이 느껴짐','이성적이지만 깊이가 있음','미스터리하고 여운이 남음']],
  ['요즘의 연애 목표에 더 가까운 건?', ['아름다운 기억을 많이 만드는 것','서로의 버팀목이 되는 것','진실한 균형과 경계 세우기','감정의 온도 맞추고 흐름 조절']],
  ['한 단어로 사랑을 정의해봐', ['예술','신념','조화','그림자']]
] as const

/* 보기 → 여신 매핑(그대로) */
const MAP: Key[] = [
  'hathor','nephthys','isis','sekhmet',
  'hathor','isis','maat','sekhmet',
  'hathor','nephthys','maat','sekhmet',
  'hathor','isis','maat','sekhmet',
  'hathor','isis','maat','nephthys',
  'hathor','isis','maat','sekhmet',
  'hathor','isis','maat','nephthys',
  'hathor','nephthys','maat','sekhmet',
  'hathor','isis','sekhmet','nephthys',
  'hathor','isis','maat','nephthys',
  'hathor','isis','maat','nephthys',
  'hathor','isis','maat','nephthys'
]

/* ========== 페이지 ========== */
export default function Page(){
  const [stage, setStage] = useState<'cover'|'name'|'quiz'|'result'>('cover')
  const [userName, setUserName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState<Key[]>([])
  const [done,setDone]=useState<Key|null>(null)

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

  if(stage === 'cover'){
    return (
      <div style={container}>
        <div style={coverCard}>
          <img src={src('cover')} alt="표지" style={coverImg} />
          <button onClick={()=>setStage('name')} style={startBtn}>시작하기 ✨</button>
        </div>
      </div>
    )
  }

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

  if(stage === 'result' && done){
    const g = GODDESS[done]
    return (
      <div style={container}>
        <div style={resultCard}>
          <div style={resultHeader}>
            <span style={resultIcon}>{g.icon}</span>
            <h1 style={resultTitle}>{userName}님은</h1>
            <h2 style={resultGoddess}>{g.name}</h2>
            <p style={resultSubtitle}>{g.subtitle}</p>
          </div>

          {/* 메인 결과 이미지도 얼굴 중심 확대 */}
          <div style={{display:'flex',justifyContent:'center',marginBottom:16}}>
            <Avatar imgKey={g.imgKey} size={320} ringColor="#ffe0f0" ringWidth={8} zoom={1.22} focus="50% 20%" />
          </div>

          <p style={resultTag}>{g.tag}</p>

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

          <div style={matchSection}>
            <h3 style={matchTitle}>💞 잘 맞는 상대</h3>
            <div style={matchGrid}>
              {g.good.map(m => (
                <Match key={m.key} keyName={m.key} label={m.name} desc={m.desc} good />
              ))}
            </div>
          </div>

          <div style={matchSection}>
            <h3 style={matchTitle}>⚡ 안 맞는 상대</h3>
            <div style={matchGrid}>
              {g.bad.map(m => (
                <Match key={m.key} keyName={m.key} label={m.name} desc={m.desc} />
              ))}
            </div>
          </div>

          <div style={actionSection}>
            <button onClick={()=>{
              setStage('cover'); setUserName(''); setNameInput('');
              setStep(0); setAns([]); setDone(null)
            }} style={retryBtn}>🔄 다시 하기</button>

            <div style={shareButtons}>
              <button onClick={shareToTwitter} style={shareBtn}>🐦 트위터 공유</button>
              <button onClick={copyLink} style={shareBtn}>🔗 링크 복사</button>
            </div>

            <button onClick={()=>alert('준비중입니다!')} style={moreBtn}>🎭 다른 테스트 해보기</button>
          </div>
        </div>
      </div>
    )
  }

  const [q, options] = Q[step]
  const pick = (i:number)=>{
    const key = MAP[step*4+i]
    const next = [...ans, key]
    setAns(next)
    if(step < Q.length-1) setStep(step+1)
    else { setDone(getWinner(next)); setStage('result') }
  }

  return (
    <div style={container}>
      <div style={quizCard}>
        <div style={progress}><div style={{...progressBar, width: `${((step+1)/Q.length)*100}%`}} /></div>
        <p style={progressText}>질문 {step+1} / {Q.length}</p>
        <h2 style={quizQuestion}>{q}</h2>
        <div style={optionGrid}>
          {options.map((label,idx)=>(
            <button key={idx} onClick={()=>pick(idx)} style={option}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ========== 로직 ========== */
function getWinner(a:Key[]):Key{
  const s:Record<Key,number>={bastet:0,isis:0,maat:0,nephthys:0,sekhmet:0,tefnut:0,serqet:0,hathor:0}
  a.forEach(k=>s[k]++)
  return Object.entries(s).sort((A,B)=>B[1]-A[1])[0][0] as Key
}

/* ========== Match(얼굴 확대 + 줄바꿈 코멘트) ========== */
function Match({ keyName, label, desc, good }:{
  keyName:string; label:string; desc:string; good?:boolean
}){
  return (
    <div style={matchItem}>
      <Avatar
        imgKey={keyName}
        size={140}
        ringColor={good ? '#ffc5d9' : '#d4a5ff'}
        ringWidth={6}
        zoom={1.4}
        focus="50% 22%"
      />
      <div style={matchName}>{label}</div>
      <div style={matchDesc}>{desc}</div>
    </div>
  )
}

/* ========== 스타일 ========== */
const container:React.CSSProperties={
  minHeight:'100vh',
  background:'linear-gradient(135deg, #ffeef8 0%, #fff4e6 50%, #e8f4ff 100%)',
  display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'
}
const coverCard:React.CSSProperties={ background:'white', borderRadius:24, padding:0, maxWidth:600, width:'100%', boxShadow:'0 8px 32px rgba(0,0,0,0.12)', overflow:'hidden' }
const coverImg:React.CSSProperties={ width:'100%', display:'block', borderRadius:'24px 24px 0 0' }
const startBtn:React.CSSProperties={ width:'calc(100% - 40px)
