import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import Display from './components/Display'
import Pad from './components/Pad'
import { Digit, Operator } from './lib/types';
import { caculate } from './lib/function'
import { findDOMNode } from 'react-dom';

const StyledApp = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue" ,Arial ,sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  width: 100%;
  margin: auto;
  margin-top: 200px;
  max-width: 320px;
`

export const App: FunctionComponent = () => {
  // Calculator's states
  const [end, setEnd] = useState<boolean>(true)
  const [pendingOperator, setPendingOperator] = useState<Operator>()
  const [display, setDisplay] = useState<string>('0')
  const [expression, setExpression] = useState<string>("")

  const init = (display:string) => {
    setDisplay(display)
    setExpression("")
    setEnd(false)
  }

  const onDigitButtonClick = ((digite: Digit) => {
    if (pendingOperator) {
      setDisplay(`${digite}`)
    } else {
      setDisplay(`${parseFloat(display + digite)}`)
    }
    if(end) {
      init(`${digite}`)
    }
    setPendingOperator(undefined)
  })

  const onPointButtonClick = (() => {
    if(end || pendingOperator) {
      setPendingOperator(undefined)
      return setDisplay('0.')
    }

    if (display.indexOf('.') === -1) {
      setDisplay(display + ".")
    }
  })

  const onOperatorButtonClick = ((operator: Operator) => {
    if((operator === "(" || operator === ")") && !end) {
      if(pendingOperator) {
        setExpression(expression + operator)
      } else {
        setExpression(expression + display + operator)
      }
      setPendingOperator(operator)
      return
    }
    if(pendingOperator !== undefined && operator !== pendingOperator) {
      setExpression(expression.slice(0, -1) + operator)
    } else if (operator === pendingOperator) {
      setExpression(expression)
    } else {
      setExpression(expression + display + operator)
    }
    setPendingOperator(operator)
    if(end) {
      init('0')
      setEnd(true)
    }
  })

  const onEqualButtonClick = () => {
    if(!end) {
      if(pendingOperator) {
        setExpression(expression + "=")
      } else {
        setExpression(expression + display + "=")
      }
      let resString = expression + display;
      let result = caculate(resString)
      if(result) {
        setDisplay(result)
      } else {
        setExpression('')
        setDisplay("Valid Expression")
      }
      setEnd(true)
    }
  }

  const onInit = () => {
    init('0')
  }

  return (
    <StyledApp>
      <Display value={display} expression={expression} />
      <Pad
        onDigitButtonClick={onDigitButtonClick}
        onPointButtonClick={onPointButtonClick}
        onOperatorButtonClick={onOperatorButtonClick}
        onInit={onInit}
        // onChangeSignButtonClick={onChangeSignButtonClick}
        onEqualButtonClick={onEqualButtonClick}
        // onAllClearButtonClick={onAllClearButtonClick}
        // onClearEntryButtonClick={onClearEntryButtonClick}
        // onMemoryRecallButtonClick={onMemoryRecallButtonClick}
        // onMemoryClearButtonClick={onMemoryClearButtonClick}
        // onMemoryPlusButtonClick={onMemoryPlusButtonClick}
        // onMemoryMinusButtonClick={onMemoryMinusButtonClick}
      />
    </StyledApp>
  )
}

export default App
