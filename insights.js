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
  return fetch(setup(url, options))
    .then((response) => response.json())
    .then((data) => {
      if (
        options.category === "accessibility" &&
        data.lighthouseResult.categories.accessibility.score < 1
      )
        console.log("Accessibility audit: ");
      if (
        options.category === "performance" &&
        data.lighthouseResult.categories.performance.score < 1
      )
        console.log("Performance audit: ");
      Object.values(data.lighthouseResult.audits).forEach(
        (audit) => audit.score !== null && audit.score < 1 && console.log(audit)
      );
    });
};

const run = (url) => {
  audit(url, {
    category: "accessibility",
  });

  audit(url, {
    category: "performance",
  });
};

run(
  "https://www.ifapme.be/formations/coordination-et-encadrement/developpeur-web-front-end-hfx"
);
