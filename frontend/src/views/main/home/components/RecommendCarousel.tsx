// TODO: If other components need to use it, make it common.
import { useState, useRef, useEffect } from 'react'

import { RoundedIconButton } from '@/components/button/RoundedIconButton'
import { iconStyle } from '@/components/icon/Icon'
import { ProductResponse } from '@/contracts/product/types'

interface Props {
  products: ProductResponse[]
}

export const RecommendCarousel = (props: Props) => {
  const { products } = props
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  const handleMovePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const handleMoveNext = () => {
    if (carousel.current !== null && carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0
  }, [])

  return (
    <div className="carousel mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-between absolute top left w-full h-full">
          <RoundedIconButton
            type={iconStyle.type.arrowLeft}
            className="w-10 h-full text-center z-10 p-0 m-0 transition-all ease-in-out duration-300"
            onClick={handleMovePrev}
          />

          <RoundedIconButton
            type={iconStyle.type.arrowRight}
            className="w-10 h-full text-center z-10 p-0 m-0 transition-all ease-in-out duration-300"
            onClick={handleMoveNext}
          />
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-3 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {products.map((product) => {
            return (
              <div key={`recommend-${product.id}`} className="carousel-item text-center relative w-64 h-64 snap-start">
                <div
                  className="rounded-xl cursor-pointer h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${product.image_url})` }}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
