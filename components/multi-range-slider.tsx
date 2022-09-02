import { useEffect, useState, useRef, useCallback, FunctionComponent } from 'react'
import PropTypes from "prop-types"
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type MultiRangeSliderProps = {
    min: number,
    max: number,
    dateRange: Date[],
    onChange: Function
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, dateRange, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // const dateRange = eachDayOfInterval({
    //     start: new Date(2021, 0, 1),
    //     end: new Date(2022, 0, 1)
    // })
    //console.log(dateRange)

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="container">

            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                className={classNames(
                    minVal > max - 100 ? 'thumb--zindex-5' : ' ',
                    'thumb left-thumb thumb--zindex-3'
                )}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                className="thumb right-thumb thumb--zindex-4"
            />


            <div className="slider">

                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">{dateRange[minVal - 1].toLocaleDateString()}</div>
                <div className="slider__right-value">{dateRange[maxVal - 2].toLocaleDateString()}</div>
            </div>
        </div>
    );

}

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider
