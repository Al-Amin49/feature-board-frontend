import GetAllComments from "./GetAllComments";

const AddComment = ({ singleFeatures, setSingleFeature }) => {
  return (
    <div className="my-10">
      <input
        type="text"
        placeholder="Leave a comment"
        className="input input-bordered input-accent w-full max-w-xs"
      />
      <GetAllComments
        singleFeatures={singleFeatures}
        setSingleFeature={setSingleFeature}
      ></GetAllComments>
    </div>
  );
};

export default AddComment;
