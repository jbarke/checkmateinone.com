/* jshint browser: true, jquery: true */
/* globals Chess, ChessBoard */
;(function () {
  'use strict';

  var mates, game;

  // Chess data.
  mates = [
    '2r2rk1/pb1q1ppp/1p6/3np1N1/1P6/P2QP3/B4PPP/2R2RK1 w - - 11 23',
    'rnb1Nbkr/1pq2p1p/p5p1/3Np3/6P1/4B3/PPP2P1P/2KR1B1R w - -',
    'r1bq4/pp1n4/2p5/8/k1B1P3/2Q5/PPP3P1/4K3 w - -',
    '4Q2r/1pp3kp/p4p2/8/2qN1B2/8/PPP3PP/7K w - -',
    '4n1rk/pbp3p1/1p5p/8/2P5/1P3NP1/PB3PK1/7R w KQkq -',
    '4nrk1/pbp2pp1/1p2p2p/2q5/2P4P/1P1QPNP1/PBB2PK1/8 w KQkq -',
    '6k1/2p2p1p/6pB/8/8/6P1/rP3PKP/4R3 w KQkq -',
    '1r4rk/2p3pp/5p2/4N3/8/6P1/1P1R1PKP/8 w KQkq -',
    '1r3r2/2p1Nppk/8/8/8/R7/1P3PPP/6K1 w KQkq -',
    '2kr2nr/3p2bp/1p3qp1/8/3P4/2PB1NBP/1P3PP1/1R3RK1 w KQkq -',
    '3r1rk1/pbp1npp1/1pn1p2p/2q5/2P5/1PQ1PNP1/PBN2PKP/5R2 w KQkq -',
    '3R1R2/pb3ppk/1pp1p1p1/5q2/2P5/1P2PNP1/P4PKP/8 w KQkq -',
    'r5r1/pbq2ppk/1pp3p1/7n/2P5/1PNBP1P1/P4PKP/R2Q1R2 w KQkq -',
    '4r2r/2p2pp1/1pk3p1/8/2P5/1P2P1Pq/P4P1P/R2Q1NK1 w KQkq -',
    '1k1r4/2pr1pp1/1p3np1/8/2P5/1P2P1P1/5PBP/R4RK1 w KQkq -',
    '3r1rk1/2p2p1p/1pN3p1/1P6/2P5/3P2P1/qB2PPBP/1R3RK1 w KQkq -',
    '6k1/6P1/5PK1/8/8/8/8/8 w KQkq -',
    '6k1/8/7K/8/8/2Q5/8/8 w KQkq -',
    '2k5/2p2r1p/6pK/2N5/1P4PP/2P5/8/4R3 w KQkq -',
    '2rr4/kppN1pb1/4p1p1/7p/4P3/7R/PPP2PP1/R5K1 w KQkq -',
    'r1bq1rk1/2p1ppbp/1pn3p1/p5N1/5P2/1PN4Q/1BPPP1PP/R4RK1 w KQkq -',
    '3r1rk1/2pb1pbp/1pn1pqp1/pB4N1/4PP1Q/1P1P4/6PP/5RK1 w KQkq -',
    'r3qrk1/1bpn1ppp/1p2p3/p3P3/3P1P1Q/1P1B4/6PP/5RK1 w KQkq -',
    'rnb1qrk1/2p2ppp/1p2p3/p7/2PP3Q/1P2P3/1B3PP1/6KR w KQkq -',
    'r3qrk1/1bpn1p1p/1p2pPpQ/p7/2P5/1P1P2P1/5PB1/5RK1 w KQkq -',
    '6R1/2pb1p2/1p2pP1r/p6k/2P4p/1P1P2P1/5PB1/6K1 w KQkq -',
    '4R2r/1pp2p2/pq1k1Pbr/5Q2/1P6/P5P1/5PB1/4R1K1 w KQkq -',
    '2r1R2r/kpp2p2/p2p1npq/8/1P2Q3/P5P1/5PB1/4R1K1 w KQkq -',
    'k7/8/BKN5/8/8/8/8/8 w KQkq -',
    'k7/8/1K6/8/8/8/2R5/8 w KQkq -',
    '4k3/8/4K3/8/R7/8/8/8 w KQkq -',
    '8/2R5/8/8/5K1k/8/8/8 w KQkq -',
    '8/7R/8/8/8/2K5/8/2k5 w KQkq -',
  ];

  // Game object.
  game = {

    //attempts: null,

    score: null,

    // Seconds.
    time: null,

    // Copy of mates data that we splice.
    mates: [],

    // DOM elements.
    boardId: 'board',
    $start: $('#start'),
    $timer: $('#timer'),
    $score: $('#score'),
    $board: null,

    // during is a function that is called during every tick.
    // done is a function called after the last tick.
    // @TODO: Maybe make this an interval to make it possible to start and
    // stop it.
    countdown: function countdown (during, done) {
      var tick = function tick () {
        this.time--;
        // Update timer every tick.
        this.updateTimer(this.$timer, this.time);

        // If a during callback was passed, call it.
        if (during) {
          during(this.time);
        }

        if (this.time === 0) {
          if (done) {
            done();
          }
        } else {
          setTimeout(tick.bind(this), 1000);
        }
      };

      if (this.time > 0) {
        setTimeout(tick.bind(this), 1000);
      }
    },

    // Return a random FEN from the mates array or false if there are no
    // more mates to solve.
    getMate: function getMate (mates) {
      var idx, mate;

      if (mates.length) {
        idx = Math.floor(Math.random() * mates.length);
        mate = mates[idx];
        mates.splice(idx, 1);
      } else {
        mate = false;
      }

      return mate;
    },

    // time parameter should be in seconds.
    getTimeString: function updateTime (time) {
      var min = Math.floor(time / 60),
          sec = time - (min * 60);
      return min + ':' + (sec < 10 ? '0' : '') + sec;
    },

    showBoard: function (boardId, position) {
      ChessBoard(boardId, {
        draggable: true,
        dropOffBoard: 'snapback',
        pieceTheme: 'images/chesspieces/wikipedia/{piece}.png',
        position: position,
        // Per instructions, only white can move.
        onDragStart: this.validateMove,
        // Is the new position mate?
        onDrop: function (source, target, piece, newPos) {
          return this.validateCheckMate(newPos, position);
        }.bind(this)
      });
    },

    showFinalScore: function showFinalScore (score) {
      this.$board.html('<p class="final-score">You solved ' + score +
          ' checkmates.</p>');
    },

    // scoreboard should be a jQuery wrapped set.
    // score is the score.
    updateScore: function updateScore (scoreboard, score) {
      scoreboard.html(score);
      return scoreboard;
    },

    // timer should be a jQuery wrapped set.
    // time is the time in seconds.
    updateTimer: function updateTimer (timer, time) {
      timer.html(this.getTimeString(time));
      return timer;
    },

    validateCheckMate: function validateCheckMate (newPos, oldPos) {
      var positionPieces = oldPos.split(' '),
          chess,
          nextMate;

      positionPieces[0] = ChessBoard.objToFen(newPos);
      positionPieces[1] = 'b';
      if (positionPieces.length === 4) {
        positionPieces[4] = '0';
        positionPieces[5] = '1';
      }
      newPos = positionPieces.join(' ');

      chess = new Chess(newPos);
      if (chess.game_over()) {
        this.updateScore(this.$score, ++this.score);
        nextMate = this.getMate(this.mates);
        if (nextMate) {
          this.showBoard(this.boardId, nextMate);
        } else {
          this.showFinalScore(this.score);
        }
      } else {
        return 'snapback';
      }
    },

    validateMove: function validateMove (source, piece) {
      if (piece.substring(0, 1) === 'w') {
        return true;
      }

      return false;
    },

    init: function init () {
      // Reset attempts, score and time.
      //this.attempts = 0;
      this.score = 0;
      this.time = 60;

      // Copy over the mates.
      mates.forEach(function (el) {
        this.mates.push(el);
      }.bind(this));

      // Reset and show timer.
      this.updateTimer(this.$timer, this.time).removeClass('hidden warning');

      // Reset and show score.
      this.updateScore(this.$score, this.score).removeClass('hidden');

      // Hide start button.
      this.$start.addClass('hidden');

      // Reset board and then show first position.
      this.$board = $('#' + this.boardId);
      this.$board.html('').removeClass('hidden');
      this.showBoard(this.boardId, this.getMate(this.mates));

      // Start the countdown.
      this.countdown(function during (seconds) {
        if (seconds <= 10) {
          this.addClass('warning');
        }
      }.bind(this.$timer), function done () {
        this.$start.removeClass('hidden');
        this.$score.addClass('hidden');
        this.$timer.addClass('hidden');
        this.showFinalScore(this.score);
      }.bind(this));
    }

  };

  // Event handlers.

  game.$start.on('click', function start () {
    game.init();
  });

}());







