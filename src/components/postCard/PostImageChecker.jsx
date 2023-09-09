import React, { useEffect, useState } from "react";

const PostImageChecker = ({ url }) => {
  const [isExist, setIsExist] = useState(false);

  const handleCheckImage = async () => {
    const res = await fetch(url);
    if (res.status === 200) setIsExist(true);
  };

  useEffect(() => {
    handleCheckImage();
  }, [url]);

  return isExist ? (
    <img src={url} alt="post img" />
  ) : (
    <img
      src="https://car-images.bauersecure.com/wp-images/2697/bmwi4_029.jpg"
      alt="post img"
    />
  );
};

export default PostImageChecker;
