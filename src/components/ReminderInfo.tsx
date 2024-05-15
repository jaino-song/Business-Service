import React from 'react'

export default function ReminderInfo() {
    return (
        <div>
            <h2>첫인사</h2>
            <h3>하단의 문자 생성 버튼을 클릭해 주세요</h3>
            <form>
                {/* To make the textarea mutable, use defaultValue instead of value */}
                <textarea defaultValue={currentGreeting}></textarea>
            </form>
        </div>
    )
}
