'use client'
import { useState } from 'react'

// 이미지 파일명 매핑
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

// 이미지 경로 생성
const src = (key:string)=> `/images/egypt-goddess/${IMG[key]}`

type Key = 'bastet'|'isis'|'maat'|'nephthys'|'sekhmet'|'tefnut'|'serqet'|'hathor'

// 여신 정보
const GODDESS: Record<Key, {
  name:string; tag:string; title:string; desc:string; imgKey:string;
  good: string[]; bad: string[];
}> = {
  bastet:{name:'바스테트',tag:'#구속은NO #밀당장인 #자유영혼',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'기쁨·축제의 여신이자 길들지 않는 고양이. 즐거움과 자유로 관계를 이끕니다',
    imgKey:'bastet', good:['thoth','horus'], bad:['ra','set']},
  isis:{name:'이시스',tag:'#헌신 #보호본능 #안정지향',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'상처를 함께 짊어지는 힐러. 신뢰와 돌봄으로 관계를 지탱합니다',
    imgKey:'isis', good:['horus','maat'], bad:['sekhmet','bastet']},
  maat:{name:'마아트',tag:'#균형 #진실 #대화중시',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'혼란 속에서도 중심을 지키는 운영자. 공정함으로 사랑을 지킵니다',
    imgKey:'maat', good:['thoth','isis'], bad:['set','nephthys']},
  nephthys:{name:'네프티스',tag:'#신비 #내면형 #조용한사랑',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'그림자와 침묵을 이해하는 사람. 표정보다 눈빛으로 말합니다',
    imgKey:'nephthys', good:['anubis','bastet'], bad:['sekhmet','ra']},
  sekhmet:{name:'세크메트',tag:'#열정 #직진 #재생',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'좋아하면 전력 질주, 식으면 단칼. 불처럼 뜨거운 사랑',
    imgKey:'sekhmet', good:['ra','bastet'], bad:['maat','nephthys']},
  tefnut:{name:'테프누트',tag:'#공감 #온도조절 #유연성',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'숨결과 분위기로 마음을 읽는 조율자. 관계의 온도를 섬세히 맞춥니다',
    imgKey:'tefnut', good:['horus','thoth'], bad:['set','sekhmet']},
  serqet:{name:'세레케트',tag:'#신뢰 #경계 #보호',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'배신을 용납하지 않는 수호자. 깊고 조용한 충성',
    imgKey:'serqet', good:['osiris','maat'], bad:['set','bastet']},
  hathor:{name:'하토르',tag:'#낭만 #감정표현 #분위기리더',
    title:'이집트 여신으로 알아보는 내 연애 유형',
    desc:'감정과 미를 다루는 로맨틱 크리에이터. 사랑을 예술로 만듭니다',
    imgKey:'hathor', good:['thoth','isis'], bad:['set','ra']}
}

// 질문 데이터
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
  ['한 단어로 사랑은?', ['예술','신념','조화','그림자']],
] as const

// 보기→여신 매핑
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

export default function Page(){
  const [started, setStarted] = useState(false)
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState<Key[]>([])
  const [done,setDone]=useState<Key|null>(null)

  // 시작 화면
  if(!started){
    return (
      <div style={card}>
        <img src={src('cover')} alt="표지"
          style={{width:'100%',borderRadius:12,marginBottom:12,objectFit:'cover'}} />
        <h1 style={{margin:'8px 0'}}>이집트 여신으로 알아보는 내 연애 유형</h1>
        <p style={{opacity:.8,margin:'0 0 16px'}}>12문항, 2~3분</p>
        <button onClick={()=>setStarted(true)} style={btn}>시작하기</button>
      </div>
    )
  }

  // 결과 화면
  if(done){
    const g = GODDESS[done]
    return (
      <div style={cardLight}>
        <img
          src={src(g.imgKey)} alt={g.name}
          style={{width:220,height:220,borderRadius:'50%',objectFit:'cover',
            border:'5px solid #f0e0c0',boxShadow:'0 0 12px rgba(0,0,0,0.25)',
            display:'block',margin:'0 auto 16px'}}
        />
        <div style={{fontSize:13,opacity:.7,marginTop:4}}>{g.tag}</div>
        <h2 style={{margin:'8px 0'}}>당신은 {g.name}와 닮았습니다</h2>
        <p style={{lineHeight:1.6,marginBottom:24}}>{g.desc}</p>

        <h3>잘 맞는 상대 💞</h3>
        <div style={gridRow}>
          {g.good.map(k => <Match key={k} keyName={k} good />)}
        </div>

        <h3 style={{marginTop:20}}>안 맞는 상대 ⚡</h3>
        <div style={gridRow}>
          {g.bad.map(k => <Match key={k} keyName={k} />)}
        </div>

        <div style={{height:1,background:'#eee',margin:'20px 0'}}/>
        <button onClick={()=>{setStarted(false);setStep(0);setAns([]);setDone(null)}} style={btnDark}>처음으로</button>
      </div>
    )
  }

  // 퀴즈 화면
  const [q, options] = Q[step]
  const pick = (i:number)=>{
    const key = MAP[step*4+i]
    const next = [...ans, key]
    setAns(next)
    if(step < Q.length-1) setStep(step+1)
    else setDone(getWinner(next))
  }

  return (
    <div style={card}>
      <div style={{opacity:.7,fontSize:13}}>이집트 여신 테스트</div>
      <h2 style={{margin:'8px 0 12px'}}>Q{step+1}. {q}</h2>
      <div style={{display:'grid',gap:12}}>
        {options.map((label,idx)=>(
          <button key={idx} onClick={()=>pick(idx)} style={opt}>{label}</button>
        ))}
      </div>
      <div style={{height:1,background:'#1d1d24',margin:'16px 0'}}/>
      <div style={{opacity:.7,fontSize:14}}>진행률 {step+1} / {Q.length}</div>
    </div>
  )
}

// 승자 계산
function getWinner(a:Key[]):Key{
  const s:Record<Key,number>={bastet:0,isis:0,maat:0,nephthys:0,sekhmet:0,tefnut:0,serqet:0,hathor:0}
  a.forEach(k=>s[k]++)
  return Object.entries(s).sort((A,B)=>B[1]-A[1])[0][0] as Key
}

// 매칭 상대 컴포넌트
function Match({keyName, good}:{keyName:string; good?:boolean}){
  return (
    <div style={{textAlign:'center'}}>
      <img
        src={src(keyName)}
        alt={keyName}
        style={{
          width:100,height:100,borderRadius:'50%',objectFit:'cover',
          border:`3px solid ${good ? '#b9e4c9' : '#e4b9b9'}`,marginBottom:6
        }}
      />
      <div style={{fontWeight:600, textTransform:'capitalize'}}>{keyName}</div>
    </div>
  )
}

/* ===== 스타일 ===== */
const card:React.CSSProperties={
  background:'#131316',border:'1px solid #1e1e24',borderRadius:16,padding:20,
  maxWidth:860,margin:'0 auto',color:'#eaeaf0'
}
const cardLight:React.CSSProperties={
  background:'#fffdf8',border:'1px solid #f0e0c0',borderRadius:16,padding:24,
  maxWidth:860,margin:'0 auto',color:'#2b2b2b',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'
}
const gridRow:React.CSSProperties={
  display:'flex',justifyContent:'center',gap:24,flexWrap:'wrap',marginBottom:12
}
const opt:React.CSSProperties={
  textAlign:'left',padding:12,borderRadius:12,border:'1px solid #2a2a33',
  background:'#17171b',color:'#eaeaf0',cursor:'pointer'
}
const btn:React.CSSProperties={
  padding:'12px 16px',borderRadius:10,border:'1px solid #2a2a33',
  background:'#2563eb',color:'#fff',cursor:'pointer'
}
const btnDark:React.CSSProperties={
  padding:'10px 14px',borderRadius:10,border:'1px solid #cfc5ad',
  background:'#222',color:'#fff',cursor:'pointer'
}