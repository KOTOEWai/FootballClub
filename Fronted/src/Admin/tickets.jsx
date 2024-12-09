import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams(); // Get match ID from URL
  console.log(id);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tickets', data);
      alert('Ticket created successfully!');
      console.log(response.data);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error creating ticket:', error.response?.data || error.message);
      alert('Failed to create ticket.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Match ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Match ID</label>
          <input
            type="text"
  
            defaultValue={id} // Set the default value from URL
            {...register('matchId', { required: 'Match ID is required' })}
            className="w-full px-3 py-2 border rounded text-red-600"
            readOnly // Makes it read-only to prevent changes
          />
          {errors.matchId && <p className="text-red-500 text-sm">{errors.matchId.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be a positive number' },
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Seating */}
        <div>
          <label className="block text-sm font-medium mb-1">Seating Type</label>
          <input
            type="text"
            {...register('seating.seatingType', { required: 'Seating type is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.seating?.seatingType && (
            <p className="text-red-500 text-sm">{errors.seating.seatingType.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
