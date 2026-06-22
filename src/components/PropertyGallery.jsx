import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

export default function PropertyGallery({ images, title }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="space-y-3">
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="rounded-2xl overflow-hidden aspect-[16/10]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`${title} - Image ${i + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="rounded-xl"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="cursor-pointer">
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-16 sm:h-20 object-cover rounded-lg" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
