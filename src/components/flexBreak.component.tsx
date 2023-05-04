import React from 'react'

const FlexBreak = ({m=0}:{m?:number}) => {
    return (
        <div style={{ flexBasis: '100%', height: 0, marginTop:m,marginBottom:m}} />
    )
}

export default FlexBreak