import { useState, useEffect } from 'react'
import useStore from '../store/store'

export default function PriceInfo() {
    const { bankAccountList, voucherList } = useStore();
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [type, setType] = useState('');
    const [fullPrice, setFullPrice] = useState('');
    const [grant, setGrant] = useState('');
    const [actualPrice, setActualPrice] = useState('');
    const [input, setInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(false);

    // Update message when type or days change
    useEffect(() => {
        if (type && days) {
            const { fullPrice, grant, actualPrice } = voucherList[type]?.[days] || {};
            setFullPrice(fullPrice || '');
            setGrant(grant || '');
            setActualPrice(actualPrice || '');
        }
    }, [type, days, voucherList]);

    const dataChecker = () => {
        if (days === 0) {
            alert('서비스 기간을 입력해 주세요');
            throw new Error('서비스 기간을 입력해 주세요');
        } else if (name === '') {
            alert('산모 이름을 입력해 주세요');
            throw new Error('산모 이름을 입력해 주세요');
        }
    };

    // Generate the price message based on form inputs
    const generatePriceMsg = () => {
        return `[인천 아이미래로]
${name} 산모님~♡ 
예약금 관련해서 안내 드립니다 :)

서비스 기간: 
    출퇴근 ${weeks}주 (평일기준 ${days}일)
정부지원 바우처 유형: 
    ${type}

기본 서비스 금액은 
총 ${fullPrice}원이며, 
정부 지원금액은 
${grant}원 입니다.

산모님께서 부담하시는 금액은 
${actualPrice}원 입니다.

서비스 예약을 위해 
선납하실 예약금은 
100,000원 입니다.

예약금 입금 후에 
서비스 예약이 확정 됩니다.

입금 계좌번호: 
${bankAccountList.find((account) => account.area === area)?.bankName} ${bankAccountList.find((account) => account.area === area)?.accNum}
예금주: 인천 아이미래로 (김정인)

입금시 입금자명을 꼭 기재해 주세요 :)
(타인 계좌에서 송금시 산모님 성함 기재 필수)

감사합니다.`;
    };

    const createText = () => {
        try {
            dataChecker();
        }
        catch {
            return;
        }

        const msg = generatePriceMsg();
        setInput(msg);
        setShowInput(true);
        setShowCopyButton(true);
    };

    const handleCopyButton = () => {
        navigator.clipboard.writeText(input).then(() => {
            alert('복사되었습니다');
        }).catch(() => {
            alert('복사에 실패했습니다. 관리자에게 문의해 주세요');
        });
    };
    

        return (
            <div>
                <h2 className='component-title'>금액 및 계좌번호</h2>
                <p>해당 항목들을 모두 작성 및 선택 후에 하단에 있는 문자 생성 버튼을 클릭해 주세요</p>

                <form>
                    <label>
                        산모 이름
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        바우처 유형
                        {/* // In react, setting a default value requires the value attribute in the select tag */}
                        <select defaultValue='' onChange={(e) => setType(e.target.value)}>
                            <option value='' disabled>선택하세요</option>
                            <option disabled>---------A형 첫째아-----------</option>
                            <option value="A가1형">A가-1형</option>
                            <option value="A통합1형">A통합-1형</option>
                            <option value="A라1형">A라-1형</option>
                            <option disabled>---------A형 둘째아-----------</option>
                            <option value="A가2형">A가-2형</option>
                            <option value="A통합2형">A통합-2형</option>
                            <option value="A라2형">A라-2형</option>
                            <option disabled>---------A형 셋째아-----------</option>
                            <option value="A가3형">A가-3형</option>
                            <option value="A통합3형">A통합-3형</option>
                            <option value="A라3형">A라-3형</option>
                            <option disabled>---------쌍생아 인력 1-----------</option>
                            <option value="B가1형">B가-1형</option>
                            <option value="B통합1형">B통합-1형</option>
                            <option value="B라1형">B라-1형</option>
                            <option disabled>---------쌍생아 인력 2-----------</option>
                            <option value="B가2형">B가-2형</option>
                            <option value="B통합2형">B통합-2형</option>
                            <option value="B라2형">B라-2형</option>
                        </select>
                    </label>
                    <label>
                        서비스 기간(일)
                        <select defaultValue='' onChange={(e) => {
                            const days = parseInt(e.target.value);
                            setDays(days);
                            setWeeks(Math.floor(days / 5));
                        }}>
                            {type ? 
                                <option disabled value=''>서비스 기간을 선택하세요</option>
                                : 
                                <option disabled value=''>바우처 유형을 선택하세요</option>
                            }
                            
                            {type && (type[0] === 'A' && type[2] === '1') && (
                                <>
                                    <option value="5">5일</option>
                                    <option value="10">10일</option>
                                    <option value="15">15일</option>
                                </>
                            )}
                            {type && (type[0] === 'B' || (type[0] === 'A' && type[2] !== '1')) && (
                                <>
                                    <option value="10">10일</option>
                                    <option value="15">15일</option>
                                    <option value="20">20일</option>
                                </>
                            )}
                        </select>
                    </label>
                    <label>
                        지역 선택
                        <select defaultValue='' onChange={(e) => setArea(e.target.value)}>
                            <option value='' disabled>선택하세요</option>
                            {bankAccountList.map((account, index) => (
                                <option key={index} value={account.area}>{account.area}</option>
                            ))}
                        </select>
                    </label>

                    <button type="button" onClick={createText}>메시지 생성</button>
                    {showInput && <textarea value={input} readOnly cols={parseInt("50")} rows={parseInt("25")} />}
                    {showCopyButton && <button type="button" onClick={handleCopyButton}>메시지 복사</button>}
                </form>
            </div>
        );
    }
