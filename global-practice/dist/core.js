(function(root) {
  const shuffle = (items, random = Math.random) => {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i+1)); [result[i],result[j]] = [result[j],result[i]]; }
    return result;
  };
  const createRound = (bank, random = Math.random) => {
    if (bank.length < 50) throw new Error('ต้องมีคำถามอย่างน้อย 50 ข้อ');
    const pictures=shuffle(bank.filter(q=>q.image)), text=shuffle(bank.filter(q=>!q.image));
    const selectedPictures=pictures.slice(0,Math.min(5,pictures.length));
    const main=text.filter(q=>q.primary), supplement=text.filter(q=>!q.primary);
    const mainCount = 25 + Math.floor(random() * 16);
    const selectedText=main.slice(0,Math.min(mainCount,50-selectedPictures.length));
    selectedText.push(...supplement.slice(0,50-selectedPictures.length-selectedText.length));
    if(selectedText.length<50-selectedPictures.length)selectedText.push(...main.slice(selectedText.length,50-selectedPictures.length));
    const selected=[...selectedPictures,...selectedText];
    if(selected.length<50)selected.push(...pictures.slice(selectedPictures.length,selectedPictures.length+50-selected.length));
    return shuffle(selected).map(q => {
      const order = shuffle([0,1,2,3]);
      return {...q, options: order.map(i=>q.options[i]), correct: order.indexOf(q.correct)};
    });
  };
  const answer = (session, index, choice) => {
    if (!Number.isInteger(choice) || choice < 0 || choice > 3 || session.answers[index] !== null) return false;
    session.answers[index] = choice;
    return true;
  };
  const stats = s => ({answered: s.answers.filter(a=>a!==null).length, correct: s.answers.reduce((n,a,i)=>n+(a===s.questions[i].correct ? 1:0),0)});
  root.QuizCore = {shuffle,createRound,answer,stats};
  if (typeof module !== 'undefined') module.exports = root.QuizCore;
})(typeof window !== 'undefined' ? window : globalThis);
