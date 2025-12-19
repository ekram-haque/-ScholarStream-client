import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/moderator/reviews");
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this review?")) return;

    try {
      const res = await axiosSecure.delete(`/moderator/reviews/${id}`);
      if (res.data.success) {
        setReviews((prev) => prev.filter((rev) => rev._id !== id));
        alert("Review deleted successfully!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete review");
    }
  };

  if (loading) return <p className="p-6">Loading reviews...</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Reviews</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-4">
        <table className="table w-full text-gray-700">
          <thead className="bg-indigo-50">
            <tr>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id} className="hover:bg-indigo-50 transition-all">
                <td>{rev.scholarshipName}</td>
                <td>{rev.universityName}</td>
                <td>{rev.comment}</td>
                <td>{rev.rating}</td>
                <td>{new Date(rev.reviewDate).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageReviews;
