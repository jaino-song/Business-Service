const dataChecker = (days: number, area: string, name: string, type: string, fullPrice: string, grant: string, actualPrice: string, weeks: number) => {
    if (type === '') {
        alert('바우처 유형을 선택해 주세요');
        throw new Error('바우처 유형 오류');
    } else if (days === 0) {
        alert('서비스 기간을 선택해 주세요');
        throw new Error('Days 오류');
    } else if (weeks === 0) {
        alert('서비스 기간 오류. 관리자에게 문의해 주세요');
        throw new Error('Weeks 오류');
    } else if (area === '') {
        alert('지역을 선택해 주세요.');
        throw new Error('지역 오류');
    } else if (name === '') {
        alert('산모 이름 오류. 관리자에게 문의해 주세요');
        throw new Error('산모 이름 오류');
    } else if (fullPrice === '') {
        alert('기본 서비스 금액 오류. 관리자에게 문의해 주세요');
        throw new Error('기본 서비스 금액 오류');
    } else if (grant === '') {
        alert('정부지원금 오류. 관리자에게 문의해 주세요');
        throw new Error('정부지원금 오류');
    } else if (actualPrice === '') {
        alert('본인부담금 오류. 관리자에게 문의해 주세요');
        throw new Error('본인부담금 오류');
    }
};

export default dataChecker;