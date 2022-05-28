import * as bookApi from "../services/bookApi";
import * as userApi from "../services/userApi";

export const getBookPredictionWithGenre = async (genres) => {
  var data = [];
  for (var i = 0; i < 3; i++) {
    var book = await bookApi.getBookWithGenre(genres[i]);
    console.log(book);
    var response = await fetch(
      `https://glacial-hamlet-68829.herokuapp.com/predict?id=${book.BookId}&size=4`
    );
    var json = await response.json();
    data.push(json);
  }
  data = normaliseData(data);
  console.log(data);
  return await bookApi.getBookswithBookIds(data);
};

export const getBookPredictionWithHistory = async (userId) => {
  var data = [];
  var historyBookIds = await userApi.getHistory(userId, 3);
  console.log(historyBookIds);
  for (var i = 0; i < historyBookIds.length; i++) {
    var bookId = historyBookIds[i];
    var response = await fetch(
      `https://glacial-hamlet-68829.herokuapp.com/predict?id=${bookId}&size=4`
    );
    var json = await response.json();
    data.push(json);
  }
  data = normaliseData(data);
  console.log(data);
  return await bookApi.getBookswithBookIds(data);
};

const normaliseData = (data) => {
  var bookIds = [];
  for (var i = 0; i < data.length; i++) {
    var prediction = data[i].prediction;
    for (var j = 0; j < prediction.length; j++) {
      if (bookIds.indexOf(prediction[j][0])) {
        bookIds.push(prediction[j][0]);
      }
    }
  }
  return bookIds;
};
