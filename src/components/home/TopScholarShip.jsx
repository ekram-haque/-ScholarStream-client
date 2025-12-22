import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function TopScholarShip() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/top/scholarships")
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch top scholarships:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading top scholarships...</div>;
  }

  return (
    <div className="w-full mb-20 px-6 lg:px-24 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold "
      >
        Featured Scholarships
      </motion.h2>

      <p className="text-gray-600 mt-2 mb-6 ">
        Here are some of the best scholarships with approaching deadlines.
      </p>

      <div className="">
        <Link
          to="/all-scholarships"
          className="inline-block bg-secondary text-black px-7 py-3 rounded-lg text-lg shadow-md hover:bg-primary hover:text-white transition"
        >
          View All
        </Link>
      </div>

      <div className="mt-10 relative overflow-visible">
        <Swiper
          className="pb-10 relative"
          style={{ paddingBottom: "60px" }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {scholarships.map((item) => (
            <SwiperSlide key={item._id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#E3F8F8] shadow-md rounded-3xl p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <img src={item.universityImage || ""} alt={item.scholarshipName} className="w-14 h-14 mb-4" />
                  <h3 className="text-xl font-semibold">{item.scholarshipName}</h3>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-medium">Amount:</span>
                    <span>${item.applicationFees}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-medium">Deadline:</span>
                    <span>{new Date(item.applicationDeadline).toLocaleDateString()}</span>
                  </div>

                  <p className="text-gray-700 mt-4 text-sm line-clamp-3">{item.scholarshipDescription}</p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    {(Array.isArray(item.subjectCategory) ? item.subjectCategory : []).map((tag, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/scholarships/${item._id}`}
                  className="mt-6 inline-block bg-secondary text-white py-2 rounded-xl text-center w-full hover:bg-primary transition"
                >
                  View Details
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div className="swiper-prev absolute -left-20 top-1/2 -translate-y-1/2 bg-[#E3F8F8] shadow-lg w-14 h-14 flex items-center justify-center rounded-full cursor-pointer z-50 text-2xl font-bold">←</div>
        <div className="swiper-next absolute -right-20 top-1/2 -translate-y-1/2 bg-[#E3F8F8] shadow-lg w-14 h-14 flex items-center justify-center rounded-full cursor-pointer z-50 text-2xl font-bold">→</div>
      </div>
    </div>
  );
}
