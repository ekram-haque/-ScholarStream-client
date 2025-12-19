import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state for editing
  const [editModal, setEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editData, setEditData] = useState({ rating: 0, comment: "" });

  // Fetch user's reviews
  useEffect(() => {
    if (!user) return;
    axiosSecure
      .get("/reviews", { params: { email: user.email } })
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        alert("Review deleted successfully!");
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete");
    }
  };

  // Open edit modal
  const handleEdit = (review) => {
    setSelectedReview(review);
    setEditData({ rating: review.rating, comment: review.comment });
    setEditModal(true);
  };

  // Save edited review
  const handleSaveEdit = async () => {
    try {
      const res = await axiosSecure.patch(`/reviews/${selectedReview._id}`, editData);
      setReviews((prev) =>
        prev.map((r) => (r._id === selectedReview._id ? res.data : r))
      );
      setEditModal(false);
      alert("Review updated!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update review");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Scholarship</th>
            <th className="px-4 py-2">University</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((r) => (
            <tr key={r._id} className="border-b">
              <td className="px-4 py-2">{r.scholarshipName}</td>
              <td className="px-4 py-2">{r.universityName}</td>
              <td className="px-4 py-2">{r.comment}</td>
              <td className="px-4 py-2">{new Date(r.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">{r.rating} / 5</td>
              <td className="px-4 py-2 space-x-1">
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Review Modal */}
      {editModal && selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Edit Review</h3>
            <label className="block mb-2">
              Rating (1-5):
              <input
                type="number"
                min="1"
                max="5"
                className="input input-bordered w-full"
                value={editData.rating}
                onChange={(e) => setEditData({ ...editData, rating: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Comment:
              <textarea
                className="textarea textarea-bordered w-full"
                value={editData.comment}
                onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
              />
            </label>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-sm btn-secondary mr-2"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-sm btn-primary" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
