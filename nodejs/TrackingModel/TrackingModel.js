// ... (previous code)

const updateTracking = (trackingNumber, trackingData) => {
  return new Promise((resolve, reject) => {
    const { status, location } = trackingData;
    const query = `UPDATE tracking SET status = ?, location = ? WHERE trackingNumber = ?`;

    db.run(query, [status, location, trackingNumber], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const deleteTracking = (trackingNumber) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM tracking WHERE trackingNumber = ?`;

    db.run(query, [trackingNumber], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  createTracking,
  getTrackingByNumber,
  updateTracking,
  deleteTracking,
};
