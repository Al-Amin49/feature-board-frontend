import { useEffect, useState } from "react";
import { getAllComments } from "../../api/Comments";


const GetAllComments = ({singleFeature, setSingleFeature}) => {

    const [loading, setLoading]=useState(true)
 
    const fetchCommentsData = async () => {
        try {
            setLoading(true)
          console.log('Fetching data for comment', singleFeature._id);
          const response = await getAllComments(singleFeature._id);
          console.log()
          console.log('response fromc comment', response)
          setSingleFeature(response.data.features);
          
        } catch (error) {
          console.log("error", error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(()=>{
        fetchCommentsData()
    }, [])
    return (
        <div>
            {/* <h3>comments: {singleFeature.comments.length}</h3>
             */}
        </div>
    );
};

export default GetAllComments;