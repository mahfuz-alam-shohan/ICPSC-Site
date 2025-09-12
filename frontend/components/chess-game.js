document.addEventListener('DOMContentLoaded',()=>{
  const boardEl=document.getElementById('chessBoard');
  if(!boardEl) return;
  const game=new Chess();
  const board=Chessboard('chessBoard',{
    draggable:true,
    position:'start',
    onDragStart:(source,piece)=>{
      if(game.game_over()) return false;
      if((game.turn()==='w' && piece.startsWith('b')) || (game.turn()==='b' && piece.startsWith('w'))) return false;
    },
    onDrop:(source,target)=>{
      const move=game.move({from:source,to:target,promotion:'q'});
      if(move===null) return 'snapback';
      updateStatus();
    },
    onSnapEnd:()=>{board.position(game.fen());}
  });
  const statusEl=document.getElementById('status');
  const resetBtn=document.getElementById('resetBtn');
  function updateStatus(){
    let status='';
    const moveColor=game.turn()==='w'?'White':'Black';
    if(game.in_checkmate()){
      status=`Game over, ${moveColor} is in checkmate.`;
    }else if(game.in_draw()){
      status='Game over, drawn position.';
    }else{
      status=`${moveColor} to move`;
      if(game.in_check()) status+=`, ${moveColor} is in check`;
    }
    if(statusEl) statusEl.textContent=status;
  }
  if(resetBtn){
    resetBtn.addEventListener('click',()=>{
      game.reset();
      board.start();
      updateStatus();
    });
  }
  updateStatus();
});
