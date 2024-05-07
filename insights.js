const setup = (url, options = {}) => {
  const api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const parameters = {
    url: encodeURIComponent(url),
    ...options,
  };
  let query = `${api}?`;
  for (key in parameters) {
    query += `&${key}=${parameters[key]}`;
  }
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
