const FeatureRequests = () => {
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row ">
        <div>
          <div className="shadow-lg p-10 text-center">
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
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequests;
