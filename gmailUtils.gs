// google app scritpのgmailドキュメント
// https://developers.google.com/apps-script/reference/gmail/#methods_2

/**
 * Deleteラベルに入っているメールを削除する
 * @param {Number} delayDay 削除猶予日数
 *
 */
function autoDeleteMails(delayDay) {
    var label = GmailApp.getUserLabelByName("Delete");
    if (label == null) {
        GmailApp.createLabel('Delete');
    } else {
        //
        var _delayDay = delayDay
        var maxDate = new Date();
        maxDate.setDate(maxDate.getDate() - _delayDay);
        var threads = label.getThreads();
        for (var i = 0; i < threads.length; i++) {
            if (threads[i].getLastMessageDate() < maxDate) {
                threads[i].moveToTrash();
            }
        }
    }
}

/**
 * gmailで任意ラベルを検索して、未読メールをすべて既読にする
 * @param labelName {String} ラベル名
 * @param status {String} メール状態
 *
 */
function markReadMail(labelName) {
    markReadMail(labelName, null);
}

/**
 * gmailで任意ラベル＆任意メール状態を検索して、未読メールをすべて既読にする
 * @param labelName {String} ラベル名
 * @param status {String} メール状態
 *
 */
function markReadMail(labelName, status) {
    var threads = null;

    if (status == null) {
        threads = GmailApp.search('label:' + labelName);
    } else {
        threads = GmailApp.search('label:' + labelName + ' is:' + status);
    }

    var messages = Array.prototype.concat.apply([], threads.map(function(t) {
        return t.getMessages();
    }));

    messages.forEach(function(message) {
        message.markRead();
    });
}

/**
 * gmailで任意ラベルを検索して、メールをすべて未読にする
 * @param labelName {String} ラベル名
 * @param status {String} メール状態
 *
 */
function markUnReadMail(labelName) {
    markUnReadMail(labelName, null);
}

/**
 * gmailで任意ラベル＆任意メール状態を検索して、メールをすべて未読にする
 * @param labelName {String} ラベル名
 * @param status {String} メール状態
 *
 */
function markUnReadMail(labelName, status) {
    var threads = null;

    if (status == null) {
        threads = GmailApp.search('label:' + labelName);
    } else {
        threads = GmailApp.search('label:' + labelName + ' is:' + status);
    }

    var messages = Array.prototype.concat.apply([], threads.map(function(t) {
        return t.getMessages();
    }));

    messages.forEach(function(message) {
        message.markUnread();
    });
}

/**
 * gmailで任意ラベルを検索して、メールオブジェクトを返す
 * @param labelName {String} ラベル名
 * @return resultArray {Array} メールオブジェクト
 */
function searchMail(labelName) {
    return searchMail(labelName, null);
}

/**
 * gmailで任意ラベル＆任意メール状態を検索して、メールオブジェクトを返す
 * @param labelName {String} ラベル名
 * @param status {String} メール状態
 * @return resultArray {Array} メールオブジェクト
 */
function searchMail(labelName, status) {
    var resultArray = [];
    var threads = null;

    if (status == null) {
        threads = GmailApp.search('label:' + labelName);
    } else {
        threads = GmailApp.search('label:' + labelName + ' is:' + status);
    }

    var messages = Array.prototype.concat.apply([], threads.map(function(t) {
        return t.getMessages();
    }));

    messages.forEach(function(message) {
        resultArray.push(message);
    });

    return resultArray;
}
