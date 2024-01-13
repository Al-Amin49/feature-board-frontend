import { useEffect, useState } from "react";
import { useFeature } from "../../context/FeatureProvider";
import { getAllComments } from "../../api/Comments";

const GetAllComments = () => {
  // const [loading, setLoading] = useState(true);
  // const { features, setFeatures } = useFeature();
  // const [singleFeature, setSingleFeature] = useState({ comments: [] });

  // const fetchCommentsData = async () => {
  //   try {
  //     setLoading(true);
  //     console.log('Fetching data for comment', features._id);
  //     const response = await getAllComments(features._id);
  //     console.log('response from comment API', response);
  //     setSingleFeature({ ...singleFeature, comments: response.data });
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCommentsData();
  // }, [features._id]);

  // console.log('Loading:', loading);
  // console.log('Single Feature:', singleFeature);

  return (
    <div>
      {/* {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          <h3>Comments:</h3>
          <ul>
            {singleFeature.comments.map((comment) => (
              <li key={comment._id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default GetAllComments;