export function TSVToJSON(tsv_string) {
  const rows = tsv_string.split("\r\n");
  const jsonArray = [];
  const header = rows[0].split("\t");
  for (let i = 1; i < rows.length; i++) {
    let obj = {};
    let row = rows[i].split("\t");
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = row[j];
    }
    jsonArray.push(obj);
  }
  return jsonArray;
}

export const isIos = () => {
  if (/Android/i.test(navigator.userAgent)) {
    return false;
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return true;
  }
};

export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.iOS();
  },
};

export function checkInsideOne(lat1, lng1, lat2, lng2, radius) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km

  const distance = Math.round(d * 1000);

  if (radius > distance) {
    return { isInside: true, distance }; // 내부에 있음
  } else {
    return { isInside: false, distance }; // 밖에 있음
  }
}

export function CalculateAngle(x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return (rad * 180) / Math.PI;
}

export function isIOS() {
  return (
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );
}

export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getClosestTarget = (data, courseId) => {
  let closest;
  data.forEach((_data, i) => {
    const courseNum = _data[courseId];
    const isInCourse = !isNaN(courseNum);
    const isUtility = courseNum === -1;
    if (!isInCourse || isUtility) return;
    closest = !closest
      ? _data
      : _data.distance < closest.distance
      ? _data
      : closest;
  });

  return closest;
};

export function randomShuffle(courseArr) {
  return courseArr.sort(() => Math.random() - 0.5);
}
