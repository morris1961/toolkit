function getContributors(contributors) {
  let authors = "";
  let trans = "";
  let editors = "";
  let author2 = "";
  contributors.forEach((e, i) => {
    if (e.type === "author")
      authors += e.name + "、";
    else if (e.type === "translator")
      trans += e.name + "、";
    else if (e.type === "editor")
      editors += e.name + "、";
    else if (e.type === "author2")
      author2 += e.name + "、";
  });
  if (authors !== "") {
    authors = authors.slice(0, authors.length - 1)
  }
  if (trans !== "") {
    trans = trans.slice(0, trans.length - 1)
  }
  if (editors !== "") {
    editors = editors.slice(0, editors.length - 1)
  }
  if (author2 !== "") {
    author2 = author2.slice(0, author2.length - 1)
  }
  return { authors, trans, editors, author2 }
}

function getPages(page1, page2) {
  if (page2 === undefined)
    return `頁${page1}。`;
  else
    return `頁${page1}-${page2}。`;

}

function getBook(values, type = "") {
  let p = "";
  if (type === "reference") {
    const { title, contributors, publisher, place, publishDate } = values;
    const { authors } = getContributors(contributors);
    p = `${authors}，《${title}》。${publisher}：${place}，${publishDate}。`
  }
  else {
    const { title, contributors, publisher, place, publishDate, page1, page2 } = values;
    const { authors, trans, editors } = getContributors(contributors);
    if (values.isFirst) {
      if (trans === "" && editors === "") {
        p += authors;
      } else {
        p += `${authors}撰`;
        if (trans !== "") p += `，${trans}譯`;
        if (editors !== "") p += `（${editors}）`;
      }
      p += `，《${title}》（${publisher}：${place}，${publishDate}），`;
      p += getPages(page1, page2);
    } else {
      p += `${authors}，《${title}》，`;
      p += getPages(page1, page2);
    }
  }
  return p;
}

function getTranslation(values, type = "") {
  let p = "";
  if (type === "reference") {
    const { title, contributors, publisher, place, publishDate } = values;
    const { authors, trans } = getContributors(contributors);
    p = `${authors}著，${trans}譯，《${title}》。${publisher}：${place}，${publishDate}。`
  }
  else {
    const { title, contributors, publisher, place, publishDate, page1, page2 } = values;
    const { authors, trans } = getContributors(contributors);
    if (values.isFirst) {
      p += `${authors.includes("、") ? authors.slice(0, authors.indexOf("、")) + "等著，" : authors + "著，"}`;
      p += `${trans.includes("、") ? trans.slice(0, trans.indexOf("、")) + "等譯" : trans + "譯"}`;
      p += `《${title}》（${publisher}：${place}，${publishDate}），`;
      p += getPages(page1, page2);
    } else {
      p += `${authors}，${trans}，《${title}》，`;
      p += getPages(page1, page2);
    }
  }
  return p;
}

function getChapter(values) {
  const { title, paraNum, paraName, contributors, publisher, place, publishDate, page1, page2 } = values;
  const { authors, trans, author2 } = getContributors(contributors);
  let p = "";
  if (values.isFirst) {
    if (author2 !== "") {
      p += `${author2}，〈${paraName}〉，`;
      if (authors.includes("、")) {
        p += `${authors.slice(0, authors.indexOf("、"))}等著`;
      } else {
        p += authors;
        if (trans !== "") {
          p += "著";
        }
      }
      p += "，";
      if (trans !== "") {
        if (trans.includes("、")) {
          p += `${trans.slice(0, trans.indexOf("、"))}等`;
        } else {
          p += trans;
        }
        p += "譯，";
      }
      p += `《${title}》（${publisher}：${place}，${publishDate}），${paraNum}，`;
      p += getPages(page1, page2);
    } else {
      if (authors.includes("、")) {
        p += `${authors.slice(0, authors.indexOf("、"))}等著`;
      } else {
        p += authors;
        if (trans !== "") {
          p += "著";
        }
      }
      p += "，";
      if (trans.includes("、")) {
        p += `${trans.slice(0, trans.indexOf("、"))}等`;
      } else {
        p += trans;
      }
      p += "譯，";
      p += `《${title}》（${publisher}：${place}，${publishDate}），${paraNum}〈${paraName}〉`;
      p += getPages(page1, page2);
    }
  } else {
    if (author2 !== "") {
      p += `${author2}，〈${paraName}〉，`;
      p += getPages(page1, page2);
    } else {
      if (authors.includes("、")) {
        p += `${authors.slice(0, authors.indexOf("、"))}等`;
      } else {
        p += authors;
      }
      p += "著，";
      p += `《${title}》，〈${paraName}〉`;
      p += getPages(page1, page2);
    }
  }

  return p;
}

function getPaper(values, type = "") {
  let p = "";
  if (type === "reference") {
    const { title, paraNum, paraName, contributors, publisher, place, publishDate, page1, page2 } = values;
    const { authors, trans } = getContributors(contributors);
    if (authors.includes("、"))
      p += `${authors.slice(0, authors.indexOf("、"))}等`;
    else
      p += authors;
    if (trans !== "")
      p += "著，"
    else
      p += "，"
    if (trans !== "") {
      if (trans.includes("、"))
        p += `${trans.slice(0, trans.indexOf("、"))}等`
      else
        p += trans
      p += "譯，"
    }
    p += `〈${paraNum} ${paraName}〉`
    p += `，《${title}》，`
    p += getPages(page1, page2)
    p += `${publisher}：${place}，${publishDate}。`
  }
  else {
    const { title, family, paraNum, paraName, contributors, publisher, place, publishDate, page1, page2 } = values;
    const { authors, trans, author2 } = getContributors(contributors);
    if (values.isFirst) {
      if (authors.includes("、")) {
        p += `${authors.slice(0, authors.indexOf("、"))}等`;
      } else {
        p += authors;
      }
      p += "，";
      if (trans !== "") {
        if (trans.includes("、")) {
          p += `${trans.slice(0, trans.indexOf("、"))}等`;
        } else {
          p += trans;
        }
        p += "譯，";
      }
      p += `〈${paraNum} ${paraName}〉`;
      if (family) {
        p += `收入氏著，《${title}》（${publisher}：${place}，${publishDate}），`;
        p += getPages(page1, page2);
      } else {
        p += `編，${author2}，《${title}》（${publisher}：${place}，${publishDate}），`;
        p += getPages(page1, page2);
      }
    } else {
      if (authors.includes("、")) {
        p += `${authors.slice(0, authors.indexOf("、"))}等`;
      } else {
        p += authors;
      }
      p += "，";
      p += `〈${paraNum} ${paraName}〉`;
      if (family) {
        p += `收入氏著，`;
        p += getPages(page1, page2);
      } else {
        p += `，`;
        p += getPages(page1, page2);
      }
    }
  }
  return p;
}

function getJournal(values, type = "") {
  let p = "";
  if (type === "reference") {
    const { title, journalName, journalVolume, journalIssue, publishDate, publisher, place, contributors, page1, page2 } = values;
    const { authors, trans } = getContributors(contributors);
    if (authors.includes("、"))
      p += authors.slice(0, authors.indexOf("、")) + "等";
    else
      p += authors
    if (trans !== "") {
      p += "著，"
      if (trans.includes("、")) {
        p += trans.slice(0, trans.indexOf("、")) + "等";
      } else {
        p += trans;
      }
      p += "譯，"
    }
    else
      p += "，"
    p += `〈${title}〉，《${journalName}》${journalVolume}${journalIssue}，${publishDate}，${publisher}：${place}，`
    p += getPages(page1, page2);
  }
  else {
    const { title, journalName, journalVolume, journalIssue, publishDate, publisher, place, contributors, page1, page2 } = values;
    const { authors, trans } = getContributors(contributors);
    if (authors.includes("、")) {
      p += authors.slice(0, authors.indexOf("、")) + "等";
    } else {
      p += authors;
    }
    if (trans !== "") {
      p += "著，";
      if (trans.includes("、")) {
        p += trans.slice(0, trans.indexOf("、")) + "等";
      } else {
        p += trans;
      }
      p += "譯，";
    } else {
      p += "，";
    }
    if (values.isFirst) {
      if (journalVolume.includes("年")) {
        p += `〈${title}〉，《${journalName}》${journalVolume}${journalIssue}（${publishDate}，${publisher}：${place}），`;
        p += getPages(page1, page2);
      } else {
        p += `〈${title}〉，《${journalName}》${journalVolume}${journalIssue}，`;
        p += getPages(page1, page2);
      }
    } else {
      p += `〈${title}〉，`;
      p += getPages(page1, page2);
    }
  }
  return p;
}

function getReview(values) {
  const { title, journalName, journalVolume, journalIssue, contributors, publisher, place, publishDate, page1, page2 } = values;
  const { authors, trans } = getContributors(contributors);
  let p = "";
  if (authors.includes("、")) {
    p += authors.slice(0, authors.indexOf("、")) + "等";
  } else {
    p += authors;
  }
  if (trans !== "") {
    p += "著，";
    if (trans.includes("、")) {
      p += trans.slice(0, trans.indexOf("、")) + "等";
    } else {
      p += trans;
    }
    p += "譯，";
  } else {
    p += "，";
  }
  p += `〈${title}〉，`;
  if (values.isFirst) {
    p += `《${journalName}》${journalVolume}${journalIssue}（${publishDate}，${publisher}：${place}），`;
    p += getPages(page1, page2);
  } else {
    p += getPages(page1, page2);
  }
  return p;
}

function getThesis(values) {
  const { title, contributors, source, publishDate, page1, page2 } = values;
  const { authors } = getContributors(contributors);
  let p = `${authors}，〈${title}〉（${source}，${publishDate}），`;
  p += getPages(page1, page2);
  return p;
}

function getHistory(values) {
  const { title, contributors, volumeNum, historyVersion, historyRoll, historyParaName, collection, publisher, place, publishDate, page1, page2 } = values;
  const { authors } = getContributors(contributors);
  let p = `${authors}，《${title}》`;
  if (collection !== "") {
    p += `，收入《${collection}》`;
  }
  p += `${volumeNum}（${publisher}：${place}，${publishDate}，${historyVersion}）${historyRoll}，〈${historyParaName}〉，`;
  p += getPages(page1, page2);
  return p;
}

function getFile(values) {
  const { title, source, page1, page2 } = values;
  let p = `${title}，${source}，${page1}－${page2}。`;
  return p;
}

function getNewspaper(values) {
  const { name, title, contributors, place, publishDate, page } = values;
  const { authors } = getContributors(contributors);
  let p = "";
  if (authors !== "") {
    p += `${authors}，`;
  }
  p += `〈${title}〉，《${name}》（${place}），${publishDate}，${page}。`;
  return p;
}

function getWebsite(values) {
  const { title, URL, year, month, day } = values;
  let p = `${title}，${URL}，（檢索日期：${year}年${month}月${day}日）。`;
  return p;
}


export {
  getBook,
  getTranslation,
  getChapter,
  getPaper,
  getJournal,
  getReview,
  getThesis,
  getHistory,
  getFile,
  getNewspaper,
  getWebsite
}