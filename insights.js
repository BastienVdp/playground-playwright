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

const audit = async (url, options) => {
  return fetch(url, (options = {}))
    .then((response) => response.json())
    .then((data) => {
      if (options.category === "accessibility")
        console.log("Accessibility audit: ");
      if (options.category === "performance")
        console.log("Performance audit: ");
      Object.values(data.lighthouseResult.audits).forEach(
        (audit) => audit.score !== null && audit.score < 1 && console.log(audit)
      );
    });
};

const run = (url) => {
  audit(setup(url), {
    category: "accessibility",
  });

  audit(setup(url), {
    category: "performance",
  });
};

run("https://www.mediakod.com");
