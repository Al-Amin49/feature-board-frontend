import FeatureBoard from "./FeatureBoard";

const FeatureRequests = () => {
    
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row sticky">
        <div>
          <div className="shadow-2xl border-2 px-10 py-4 border-spacing-2 text-center sticky">
            <h3>Feature Request</h3>
            <p>Let us know what features you&rsquo;d like to see</p>
            <form action="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text uppercase font-medium">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Short, descriptive title"
                  className="input input-bordered input-secondary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text uppercase font-medium">
                    Details
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Any additional details"
                  className="input input-bordered input-secondary"
                  required
                />
              </div>
              <button className="btn my-4 btn-primary">Request Feature</button>
            </form>
          </div>
        </div>
        <div className="pl-10"> 
          <FeatureBoard/>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequests;
