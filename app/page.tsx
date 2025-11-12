'use client'
import { useState } from 'react'

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

type Key = 'bastet'|'isis'|'maat'|'nephthys'|'sekhmet'|'tefnut'|'serqet'|'hathor'

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
    desc:'사랑스럽지만 절대 길들여지지 않는 고양이의 여신. 바스테트는 기쁨과 자유, 그리고 자기만의 세계를 지켜내는 존재예요. 애정도, 유혹도, 모두 \'게임처럼\' 즐길 줄 아는 연애의 달인.',
    personality:'인싸력 만렙. 새로움에 끌리고, 늘 주변에 웃음을 퍼뜨립니다. 하지만 때때로 혼자만의 동굴이 필요하죠. 가까이하면 따뜻하지만, 선 넘으면 냉정한 사람.',
    loveStyle:'관심 없는 척하다가도 한순간에 몰입. 하지만 "지금 뭐해?" 같은 구속 멘트엔 바로 식어버림. 관계가 지루해지면 고양이처럼 조용히 사라집니다.',
    charm:'상대는 당신의 \'도도한 여유\'에 중독돼요. "도대체 무슨 생각을 하는 거야?"라는 말, 바로 당신 칭찬이에요.',
    tip:'당신의 자유는 매력이지만, \'무관심\'으로 보일 수도 있어요. 진심이라면 애정 표현은 숨기지 말 것.',
    imgKey:'bastet',
    good:[
      {name:'토트',key:'thoth',desc:'지혜와 언어의 신. 지적이고 재치 있는 뇌섹남으로 당신의 예측 불가능함을 유쾌하게 즐김'},
      {name:'호루스',key:'horus',desc:'하늘의 신. 안정적이면서도 자유를 존중하는 균형잡힌 리더형'}
    ],
    bad:[
      {name:'라',key:'ra',desc:'태양신. 규칙과 질서를 중시하는 FM형으로 당신의 자유로움과 충돌'},
      {name:'세트',key:'set',desc:'혼돈의 신. 예측 불가능한 성향이 비슷해 오히려 서로를 지치게 함'}
    ]
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
    good:[
      {name:'호루스',key:'horus',desc:'하늘의 신이자 이시스의 아들. 당신의 헌신을 파트너십으로 바꿔주는 이상적인 관계'},
      {name:'마아트',key:'maat',desc:'정의의 여신. 당신의 감성과 그녀의 이성이 완벽한 균형을 이룸'}
    ],
    bad:[
      {name:'세크메트',key:'sekhmet',desc:'전쟁의 여신. 강렬한 감정 기복으로 당신의 평화를 흔듦'},
      {name:'바스테트',key:'bastet',desc:'자유의 여신. 당신의 헌신을 부담스러워하며 거리를 둠'}
    ]
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
    good:[
      {name:'토트',key:'thoth',desc:'지혜의 신. 이해와 대화가 완벽하게 통하는 지적 커플'},
      {name:'이시스',key:'isis',desc:'마법의 여신. 당신의 이성과 그녀의 감성이 조화를 이룸'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'혼돈의 신. 규칙을 무시하고 혼란을 즐기는 타입으로 정면충돌'},
      {name:'네프티스',key:'nephthys',desc:'어둠의 여신. 감정을 숨기는 스타일이 당신의 명확함과 맞지 않음'}
    ]
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
    good:[
      {name:'아누비스',key:'anubis',desc:'저승의 신. 당신의 침묵과 어둠을 이해하는 영혼의 동반자'},
      {name:'바스테트',key:'bastet',desc:'기쁨의 여신. 당신의 내면에 밝은 에너지를 불어넣어줌'}
    ],
    bad:[
      {name:'세크메트',key:'sekhmet',desc:'전쟁의 여신. 직설적이고 강렬한 표현이 당신을 압도함'},
      {name:'라',key:'ra',desc:'태양신. 모든 것을 밝게 드러내려는 성향이 당신의 신비로움과 충돌'}
    ]
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
    good:[
      {name:'라',key:'ra',desc:'태양신. 같은 불의 속성으로 서로의 에너지를 증폭시킴'},
      {name:'바스테트',key:'bastet',desc:'기쁨의 여신. 당신의 열정에 가벼운 유쾌함을 더해줌'}
    ],
    bad:[
      {name:'마아트',key:'maat',desc:'정의의 여신. 감정보다 이성을 중시해 당신의 열정을 이해 못함'},
      {name:'네프티스',key:'nephthys',desc:'어둠의 여신. 감정선이 정반대라 서로를 지치게 함'}
    ]
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
    good:[
      {name:'호루스',key:'horus',desc:'하늘의 신. 당신의 섬세함을 존중하며 함께 성장하는 안정형'},
      {name:'토트',key:'thoth',desc:'지혜의 신. 당신의 감정을 언어로 명확히 정리해주는 파트너'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'혼돈의 신. 극단적인 감정 기복으로 당신을 번아웃시킴'},
      {name:'세크메트',key:'sekhmet',desc:'전쟁의 여신. 지나치게 직설적인 표현이 당신을 상처입힘'}
    ]
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
    good:[
      {name:'오시리스',key:'osiris',desc:'저승의 왕. 당신의 신중함과 그의 헌신이 완벽히 맞물림'},
      {name:'마아트',key:'maat',desc:'정의의 여신. 원칙과 질서를 중시하는 점에서 깊은 공감대 형성'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'혼돈의 신. 경계 없이 들이대는 타입으로 당신의 선을 넘음'},
      {name:'바스테트',key:'bastet',desc:'자유의 여신. 지나친 자유로움이 당신의 신뢰 기준에 맞지 않음'}
    ]
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
    good:[
      {name:'토트',key:'thoth',desc:'지혜의 신. 당신의 감정을 언어로 명확히 정리해줄 완벽한 소통 파트너'},
      {name:'이시스',key:'isis',desc:'마법의 여신. 당신의 낭만을 안정감으로 보완해주는 최고의 조합'}
    ],
    bad:[
      {name:'세트',key:'set',desc:'혼돈의 신. 거친 감정 표현으로 당신의 섬세한 낭만을 깨뜨림'},
      {name:'라',key:'ra',desc:'태양신. 원칙과 규칙을 강조해 당신의 자유로운 감성과 충돌'}
    ]
  }
}한 영역, 한 번이면 평생형',
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

const Q = [
  ['연애 초반, 당신은 어떤 스타일인가요?', ['분위기를 먼저 리드하며 다정하게 다가간다','감정을 쉽게 드러내지 않고 천천히 탐색한다','헌신적으로 안정감을 제공하려 노력한다','강렬하게 주도권을 잡고 적극적으로 다가간다']],
  ['사랑이 깊어질수록 당신의 본모습은?', ['감정을 예술처럼 아름답게 표현한다','상대의 약한 모습을 감싸며 지탱해준다','균형과 진실을 지키려 노력한다','질투와 열정이 더욱 뜨거워진다']],
  ['연애에서 가장 두려운 순간은?', ['내 사랑이 가볍게 보이는 것','관계의 끝이 보여도 아무것도 할 수 없을 때','거짓과 불균형이 생기는 것','내 강한 감정이 상대를 다치게 할까 봐']],
  ['연인을 위해 할 수 있는 최선은?', ['늘 행복하고 즐겁게 만들어주는 것','끝까지 믿고 기다려주는 것','냉정하게 원인을 분석하고 정리하는 것','모든 걸 불태워서라도 진심을 보여주는 것']],
  ['관계가 흔들릴 때 당신의 태도는?', ['다시 웃게 만들려고 노력한다','운명을 믿고 조용히 기다린다','차분하게 원인을 분석한다','아프더라도 깔끔하게 끝낸다']],
  ['이상형의 가장 중요한 포인트는?', ['유머 감각과 따뜻한 성격','침착하고 신뢰할 수 있는 사람','명확한 가치관을 가진 사람','강렬하고 매력적인 사람']],
  ['연애를 통해 배우고 싶은 것은?', ['감정이 가진 힘과 아름다움','타인을 진심으로 사랑하는 법','세상과 조화롭게 사는 법','진정한 나 자신을 이해하는 것']],
  ['당신의 사랑이 피어나는 장소는?', ['음악, 공연, 전시 같은 문화 공간','고요하고 비밀스러운 밤의 공간','의미 있는 대화를 나누는 산책길','함께 땀 흘리며 도전하는 활동']],
  ['사랑을 잃었을 때 당신은?', ['감정을 예술로 승화시킨다','추억을 간직하며 일상으로 돌아간다','새로운 일에 몰두하며 회복한다','조용히 멀어지며 스스로 치유한다']],
  ['주변 사람들이 보는 당신의 연애는?', ['늘 사랑이 예쁘고 행복해 보인다','묵직하고 진심이 느껴진다','이성적이지만 깊은 감정이 있다','미스터리하고 읽기 어렵다']],
  ['당신에게 연애의 목적은?', ['아름다운 기억을 함께 만드는 것','서로의 든든한 버팀목이 되는 것','진실하고 균형 잡힌 관계를 배우는 것','어둠까지 서로 이해받는 것']],
  ['한 단어로 사랑을 표현한다면?', ['예술','신념','조화','그림자']],
] as const

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
  const [stage, setStage] = useState<'cover'|'name'|'quiz'|'result'>('cover')
  const [userName, setUserName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [step,setStep]=useState(0)
  const [ans,setAns]=useState<Key[]>([])
  const [done,setDone]=useState<Key|null>(null)

  // 공유 기능
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

  // 커버 화면
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

  // 이름 입력 화면
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

  // 결과 화면
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

          {/* 본문 섹션들 */}
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

          {/* 액션 버튼들 */}
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

  // 퀴즈 화면
  const [q, options] = Q[step]
  const pick = (i:number)=>{
    const key = MAP[step*4+i]
    const next = [...ans, key]
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

function getWinner(a:Key[]):Key{
  const s:Record<Key,number>={bastet:0,isis:0,maat:0,nephthys:0,sekhmet:0,tefnut:0,serqet:0,hathor:0}
  a.forEach(k=>s[k]++)
  return Object.entries(s).sort((A,B)=>B[1]-A[1])[0][0] as Key
}

function Match({keyName, label, desc, good}:{keyName:string; label:string; desc:string; good?:boolean}){
  return (
    <div style={matchItem}>
      <img src={src(keyName)} alt={label} style={{
        ...matchImg,
        border: `5px solid ${good ? '#ffc5d9' : '#d4a5ff'}`
      }} />
      <div style={matchName}>{label}</div>
      <p style={matchDesc}>{desc}</p>
    </div>
  )
}

/* ===== 스타일 ===== */
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
  border:'2px solid #667eea',
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