const Listing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            id="description"
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Address"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
        
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="bed"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
                defaultValue={0}
                
              />
              <span>Beds</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bath"
                min={"1"}
                max={"10"}
                required
                defaultValue={0}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                defaultValue={0}
                className="p-3 border border-gray-300 rounded-lg"
                min="1"
                max="10"
              />
              <div className="flex flex-col">
                <span>Regular Price</span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                required
                defaultValue={0}
                className="p-3 border border-gray-300 rounded-lg "
                min="1"
                max="10"
              />
              <div className="flex flex-col">
                <span>Discounted Price </span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-slate-500 ml-2">The first image will be the cover(max 6)</span>
          </p>
          <div className="flex">
              <input className="p-3 border border-gray-300 rounded w-full mr-5" type="file" id="images" accept="image/*"  multiple/>
              <button className="p-3 border rounded border-green-700 text-green-700 uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button className="text-white bg-slate-700 uppercase  rounded-lg p-3 mt-5 hover:opacity-95 disabled:opacity-80">Create listing</button>
        </div>
      </form>
    </main>
  );
};

export default Listing;
