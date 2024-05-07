const setup = (url, options = {}) => {
  const api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const parameters = {
    url: encodeURIComponent(url),
    ...options,
  };
  let query = `${api}?`;
  Object.entries(parameters).forEach(([key, value], index) => {
    if (index === 0) query += `${key}=${value}`;
    else query += `&${key}=${value}`;
  });

  return query;
};

const run = () => {
  fetch(
    setup("https://www.ifapme.be/", {
      category: "accessibility",
    })
  )
    .then((response) => response.json())
    .then((data) => {
      Object.values(data.lighthouseResult.audits).forEach(
        (audit) => audit.score !== null && audit.score < 1 && console.log(audit)
      );
    });
};

run();
