import { useState, useEffect, useRef } from 'react'
import './Calculator.scss'

const Calculator = ({ result, sign, fNumber, sNumber, setResult, setSign, setFNumber, setSNumber }) => {

    const ref = useRef(null);

    useEffect(() => {
      ref.current.focus();
    }, []);

    const [history, setHistory] = useState([])
    const [isHistory, setIsHistory] = useState(true)

    const AddNumberFunction = (number) => {
        console.log(result.length);
        if (result.length < 13 || result.length === undefined){
            if (sign === '') {
                setFNumber(prev => prev + number + '')
            }
            else if (sign !== '') {
                setSNumber(prev => prev + number + '')
            }
    
            setResult(prev => prev + number + '')
        }
    }

    const AddSignFunction = (s) => {
        if (sign === '') {
            setSign(s)
            setResult(prev => prev + s + '')
        }
    }

    const DotFunction = (dot) => {
        if (fNumber === 0){
            setFNumber(prev => prev + dot + '')
            setResult(prev => prev + dot + '')
        }
        else if (sNumber === 0){
            setSNumber(prev => prev + dot + '')
            setResult(prev => prev + dot + '')
        }
        else if (sign === '' && fNumber.split('').find(el => el === '.') !== '.') {
            setFNumber(prev => prev + dot + '')
            setResult(prev => prev + dot + '')
        }
        else if (sign !== '' && sNumber !== 0 && sNumber.split('').find(el => el === '.') !== '.') {
            setSNumber(prev => prev + dot + '')
            setResult(prev => prev + dot + '')
        }
    }

    const BackspaceFunction = () => {
        if (result !== ''){
            if (result.substring(result.length - 1) === sign){
                setSign('')
            }
            else if (sign === '' && result.substring(result.length - 1) !== sign) {
                setFNumber(prev => prev.slice(0, -1))
            }
            else if (sign !== '' && result.substring(result.length - 1) !== sign) {
                setSNumber(prev => prev.slice(0, -1))
            }
            
            setResult(prev => prev.slice(0, -1))
        }
    }

    const ModuleFunction = () => {
        if (sign === '') {
            if (fNumber[0] === '-') {
                setFNumber(prev => prev.substring(1))
                setResult(prev => prev.substring(1))
            }
            else {
                setFNumber(prev => '-' + prev)
                setResult(prev => '-' + prev)
            }
        }
        else if (sign !== '') {
            if (sNumber[0] === '-') {
                setSNumber(prev => prev.substring(1))
                setResult(prev => prev.substring(1))
            }
            else {
                setSNumber(prev => '-' + prev)
                setResult(prev => '-' + prev)
            }
        }
    }

    const handleKeyDown = (e) => {
        if (/[0-9]/.test(e.key)){
            AddNumberFunction(parseInt(e.key))
        }
        else if (e.key === '.' || e.key === 'ю'){
            DotFunction('.')
        }
        else if (/[+%*-/]/.test(e.key)){
            console.log('asdsad')
            AddSignFunction(e.key)
        }
        else if (e.key === 'Enter'){
            GetResultFunction()
        }
        else if (e.key === 'Backspace'){
            BackspaceFunction()
        }
    }

    const GetResultFunction = () => {
        if (fNumber !== 0 && sNumber !== 0 && sign !== '') {
            switch (sign) {
                case '-':
                    setResult(`${parseFloat((parseFloat(fNumber) - parseFloat(sNumber)).toFixed(2))}`)
                    setFNumber(`${parseFloat((parseFloat(fNumber) - parseFloat(sNumber)).toFixed(2))}`)
                    setHistory(prev => [...prev, fNumber + sign + sNumber + '=' + parseFloat((parseFloat(fNumber) - parseFloat(sNumber)).toFixed(2))])
                    break;
                case '+':
                    setResult(`${parseFloat((parseFloat(fNumber) + parseFloat(sNumber)).toFixed(2))}`)
                    setFNumber(`${parseFloat((parseFloat(fNumber) + parseFloat(sNumber)).toFixed(2))}`)
                    setHistory(prev => [...prev, fNumber + sign + sNumber + '=' + parseFloat((parseFloat(fNumber) + parseFloat(sNumber)).toFixed(2))])
                    break;
                case '%':
                    setResult(`${parseFloat((parseFloat(fNumber) % parseFloat(sNumber)).toFixed(2))}`)
                    setFNumber(`${parseFloat((parseFloat(fNumber) % parseFloat(sNumber)).toFixed(2))}`)
                    setHistory(prev => [...prev, fNumber + sign + sNumber + '=' + parseFloat((parseFloat(fNumber) % parseFloat(sNumber)).toFixed(2))])
                    break;
                case '/':
                    setResult(`${parseFloat((parseFloat(fNumber) / parseFloat(sNumber)).toFixed(2))}`)
                    setFNumber(`${parseFloat((parseFloat(fNumber) / parseFloat(sNumber)).toFixed(2))}`)
                    setHistory(prev => [...prev, fNumber + sign + sNumber + '=' + parseFloat((parseFloat(fNumber) / parseFloat(sNumber)).toFixed(2))])
                    break;
                case '*':
                    setResult(`${parseFloat((parseFloat(fNumber) * parseFloat(sNumber)).toFixed(2))}`)
                    setFNumber(`${parseFloat((parseFloat(fNumber) * parseFloat(sNumber)).toFixed(2))}`)
                    setHistory(prev => [...prev, fNumber + sign + sNumber + '=' + parseFloat((parseFloat(fNumber) * parseFloat(sNumber)).toFixed(2))])
                    break;
                default:
                    alert('Error')
                    break;
            }

            setSNumber(0)
            setSign('')
        }
    }

    const ClearAllFunction = () => {
        setResult(0)
        setSNumber(0)
        setFNumber(0)
        setSign('')
    }

    return (
        <>
        {
            onkeydown
        }
            <div className="container-calc" ref={ref} tabIndex={0} onKeyDown={handleKeyDown}>
                <div className={`${result.length > 10 ? 'item-display big-display' : 'item-display'}`}>{result}</div>
                <div onClick={() => ClearAllFunction()} className='item-clear'>clear</div>
                <div onClick={() => GetResultFunction()} className='item-equal'>=</div>
                <div onClick={() => AddSignFunction('-')} className='item-minus'>-</div>
                <div onClick={() => AddSignFunction('+')} className='item-plus'>+</div>
                <div onClick={ModuleFunction} className='item-module'>+/-</div>
                <div onClick={() => AddSignFunction('%')} className='item-remainder'>%</div>
                <div onClick={() => AddSignFunction('/')} className='item-division'>÷</div>
                <div onClick={() => AddSignFunction('*')} className='item-multiply'>×</div>
                <div onClick={() => DotFunction('.')} className='item-comma'>.</div>
                {
                    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(num => <div key={num} onClick={() => AddNumberFunction(num)} className={`item-${num}s`}>{num}</div>)
                }
            </div>
            <div className={`${isHistory ? 'history-container history-container-closed' : 'history-container'}`}>
                <div className='history-title'>
                    {history.length !== 0 && <div onClick={() => setHistory([])} className='remove-button'></div>}
                    HISTORY OF CALCULATION
                    {isHistory ? <div onClick={() => setIsHistory(!isHistory)} className='open-button'></div> : <div onClick={() => setIsHistory(!isHistory)} className='closed-button'></div>}
                </div>
                <div className={`${isHistory ? 'history-closed' : 'history'}`}>
                {history.length === 0 && <p className='no-history-message'>No calculation history yet!</p>}
                    {
                        history.map((el, index) => <div key={index}>{el}</div>)
                    }
                </div>
            </div>
        </>

    );
}

export default Calculator;