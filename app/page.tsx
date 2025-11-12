'use client'
import { useState, type CSSProperties } from 'react'

/* ========= 이미지 매핑 (public/images/egypt-goddess/ 에 파일 존재해야 함) ========= */
const IMG: Record<string, string> = {
  bastet:'bastet.png',
  isis:'isis.jpg',           // 이건 jpg
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
const src = (key: string) => `/images/egypt-goddess/${IMG[key]}`

/* ========= 타입 ========= */
type Key = 'bastet'|'isis'|'maat'|'nephthys'|'sekhmet'|'tefnut'|'serqet'|'hathor'
type PickRec = { k: Key; w: number; i: number }

/* ========= 결과 카드 데이터 (디자인/톤 유지) ========= */
const GODDESS: Record<Key, {
  name: string; tag: string; title: string; desc: string; imgKey: string;
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

/* ========= 질문 12개 (문항은 물음표, 보기는 진술형) ========= */
const Q = [
  {
    q: '어떤 데이트가 가장 끌려?',
    a: [
      '사람 없는 작은 바에서 깊은 대화',
      '페스티벌에서 춤추며 밤새기',
      '미술관·천문대·북스테이 감성 코스',
      '집에서 요리하고 영화 보는 잔잔한 밤'
    ]
  },
  {
    q: '연인과 갈등이 생기면 어떻게 해?',
    a: [
      '감정을 먼저 다독이며 공감한다',
      '사실·원인을 정리해 합의점을 찾는다',
      '시간을 두고 진정한 뒤 다시 이야기한다',
      '오해 없게 즉시 솔직하게 직진 대화한다'
    ]
  },
  {
    q: '사랑을 주로 어떻게 표현해?',
    a: [
      '말·스킨십·작은 이벤트로 매일 티 낸다',
      '행동으로 증명한다(보호·문제 해결)',
      '깊은 공감과 케어로 보듬는다',
      '특별한 순간에만 조심스레 고백한다'
    ]
  },
  {
    q: '연애의 핵심 가치로 하나만 고른다면?',
    a: [
      '자유와 개성 존중',
      '정직·신뢰·공정',
      '강렬함과 몰입, 유일성',
      '안정감·루틴·일상의 포근함'
    ]
  },
  {
    q: '이별 직후의 너는 어떤 편이야?',
    a: [
      '혼자 조용히 정리하며 마음을 치유한다',
      '친구들과 웃고 떠들며 에너지를 채운다',
      '배운 점을 메모하고 현실적으로 정리한다',
      '끝났으면 선 긋고 뒤돌아보지 않는다'
    ]
  },
  {
    q: '연인에게 가장 바라는 건 뭐야?',
    a: [
      '말하지 않아도 통하는 영혼의 교감',
      '매일 조금씩 즐거워지는 긍정 에너지',
      '투명함과 약속, 균형 잡힌 파트너십',
      '적당한 거리와 각자의 시간 존중'
    ]
  },
  {
    q: '질투가 올라올 때 어떻게 반응해?',
    a: [
      '겉으로 내색 안 하고 스스로 해소한다',
      '사실만 묻고 감정을 차분히 표현한다',
      '선이 넘어가면 단호하게 대응한다',
      '한 번 더 믿고 큰 흐름을 본다'
    ]
  },
  {
    q: '사랑에 빠진 너를 한 문장으로 말하면?',
    a: [
      '“당신의 안식처가 되어 줄게”',
      '“오늘도 네가 즐거웠으면 좋겠어”',
      '“내가 지킬게, 걱정 마”',
      '“나에게는 너 하나면 충분해”'
    ]
  },
  {
    q: '연애할 때 너의 역할은 뭐에 가까워?',
    a: [
      '든든한 보호자·문제 해결사',
      '상담가·치유자·감정 번역기',
      '분위기 메이커·축제 진행자',
      '영감 주는 뮤즈·아이디어 뱅크'
    ]
  },
  {
    q: '이상적인 관계의 그림은 뭐야?',
    a: [
      '운명 같은 한 사람과 평생 동행',
      '서로를 성장시키는 공평한 파트너',
      '가까우면서도 숨 쉴 틈이 있는 연인',
      '매 순간이 이벤트처럼 반짝이는 로맨스'
    ]
  },
  {
    q: '아침에 첫 메시지를 보낸다면 뭐라고 할래?',
    a: [
      '오늘 약속 잊지 말자, 저녁에 이어서 이야기하자',
      '굿모닝 ☀ 오늘 재미있는 일 하나 만들자',
      '오후엔 각자 시간, 밤엔 같이 쉬자',
      '주말에 별 보러 짧게 갈래'
    ]
  },
  {
    q: '상대가 가장 좋아할 선물 하나를 고른다면?',
    a: [
      '손편지+티 블렌딩 세트',
      '멀티툴·러닝화 같은 실용템',
      '강렬한 포인트 아이템',
      '그 사람만 아는 취향의 책·향'
    ]
  }
] as const

/* ========= 보기 → 여신 매핑 ========= */
const MAP: Key[] = [
  // Q1
  'nephthys','hathor','tefnut','bastet',
  // Q2
  'isis','maat','bastet','serqet',
  // Q3
  'hathor','sekhmet','isis','nephthys',
  // Q4
  'tefnut','maat','serqet','bastet',
  // Q5
  'nephthys','hathor','sekhmet','serqet',
  // Q6
  'isis','hathor','maat','bastet',
  // Q7
  'nephthys','maat','serqet','tefnut',
  // Q8
  'isis','hathor','sekhmet','serqet',
  // Q9
  'sekhmet','isis','hathor','tefnut',
  // Q10
  'isis','maat','bastet','hathor',
  // Q11
  'maat','hathor','bastet','tefnut',
  // Q12
  'isis','sekhmet','serqet','nephthys'
]

/* ========= 가중치: Q1~Q8 = 2점, Q9~Q12 = 1점 ========= */
const WEIGHT: number[] = [
  // Q1..Q8 (32개)
  2,2,2,2,  2,2,2,2,  2,2,2,2,  2,2,2,2,
  2,2,2,2,  2,2,2,2,  2,2,2,2,  2,2,2,2,
  // Q9..Q12 (16개)
  1,1,1,1,  1,1,1,1,  1,1,1,1,  1,1,1,1
]

/* ========= 페이지 ========= */
export default function Page(){
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState<PickRec[]>([])
  const [done, setDone] = useState<Key | null>(null)

  if (!started) {
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

  if (done) {
    const g = GODDESS[done]
    return (
      <div style={cardLight}>
        <img
          src={src(g.imgKey)} alt={g.name}
          style={{
            width:220,height:220,borderRadius:'50%',objectFit:'cover',
            border:'5px solid #f0e0c0',boxShadow:'0 0 12px rgba(0,0,0,0.25)',
            display:'block',margin:'0 auto 16px'
          }}
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
        <button
          onClick={()=>{setStarted(false);setStep(0);setAns([]);setDone(null)}}
          style={btnDark}
        >
          처음으로
        </button>
      </div>
    )
  }

  const { q, a: options } = Q[step]
  const pick = (i: number) => {
    const key = MAP[step*4 + i]
    const w = WEIGHT[step*4 + i]
    const next = [...ans, { k:key, w, i:step }]
    setAns(next)
    if (step < Q.length - 1) setStep(step + 1)
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

/* ========= 결과 산정 (랜덤 없음, 동점 시 최근기여 우선) ========= */
function getWinner(a: PickRec[]): Key {
  const s:Record<Key,number>={bastet:0,isis:0,maat:0,nephthys:0,sekhmet:0,tefnut:0,serqet:0,hathor:0}
  a.forEach(p=>{ s[p.k]+=p.w })

  // 1) 최다 득점
  let max = Math.max(...Object.values(s))
  let cands = Object.entries(s).filter(([,v])=>v===max).map(([k])=>k as Key)

  // 2) 최근 선택 가중(뒤쪽 문항일수록 가중)
  if(cands.length>1){
    const recent = (g:Key)=>a.reduce((acc,p)=>acc+(p.k===g?(p.i+1)*p.w:0),0)
    const best = Math.max(...cands.map(recent))
    cands = cands.filter(g=>recent(g)===best)
  }

  // 3) 알파벳 안정 타이브레이커
  cands.sort()
  return cands[0]
}

/* ========= 매치 카드 ========= */
function Match({ keyName, good }: { keyName: string; good?: boolean }) {
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

/* ========= 스타일 (원래 카드/버튼 디자인 유지) ========= */
const card: CSSProperties = {
  background:'#131316',border:'1px solid #1e1e24',borderRadius:16,padding:20,
  maxWidth:860,margin:'0 auto',color:'#eaeaf0'
}
const cardLight: CSSProperties = {
  background:'#fffdf8',border:'1px solid #f0e0c0',borderRadius:16,padding:24,
  maxWidth:860,margin:'0 auto',color:'#2b2b2b',boxShadow:'0 4px 16px rgba(0,0,0,0.08)'
}
const gridRow: CSSProperties = {
  display:'flex',justifyContent:'center',gap:24,flexWrap:'wrap',marginBottom:12
}
const opt: CSSProperties = {
  textAlign:'left',padding:12,borderRadius:12,border:'1px solid #2a2a33',
  background:'#17171b',color:'#eaeaf0',cursor:'pointer'
}
const btn: CSSProperties = {
  padding:'12px 16px',borderRadius:10,border:'1px solid #2a2a33',
  background:'#2563eb',color:'#fff',cursor:'pointer'
}
const btnDark: CSSProperties = {
  padding:'10px 14px',borderRadius:10,border:'1px solid #cfc5ad',
  background:'#222',color:'#fff',cursor:'pointer'
}
