/* jshint browser: true, jquery: true */
/* globals Chess, ChessBoard */
;(function () {
  'use strict';

  var mates, game;

  // Chess data.
  mates = [
    'kr1r4/4p3/1p1p4/1Q1P4/2P5/6P1/5PK1/8 w KQkq -',
    '1r4rk/pb1q1p2/1pnp2p1/4p3/4P3/1P1PQNP1/PB3PKP/R4R2 w KQkq -',
    '3r1rk1/pb1qbp2/1pnp2p1/7p/2B1P1Q1/1P1P1NPP/PB3PK1/R4R2 w KQkq -',
    '3r2r1/pbbq1pk1/1p2p1p1/3pP2p/3P4/1P2QNPP/P2B1PK1/R4R2 w KQkq -',
    '6r1/p6k/5Pp1/4p1p1/4P1P1/5PP1/5K2/R7 w KQkq -',
    '1r6/p1R5/5pk1/4pNp1/4P1P1/5PP1/5K2/8 w KQkq -',
    '1r6/prR5/5pk1/4p1p1/4PPP1/5PKR/8/8 w KQkq -',
    '1r2k3/pr2p3/4Pp2/6p1/4P1P1/R4PKR/8/8 w KQkq -',
    '5r2/p3p3/1n2Pk2/5Pp1/6P1/R4PK1/5B2/8 w KQkq -',
    '5r2/8/1p5R/n1pPk1p1/4P1P1/5PK1/5B2/8 w KQkq -',
    '5rk1/2p2p2/1p1n1Bp1/3P4/4P1P1/5PK1/7R/8 w KQkq -',
    '2q2rk1/1pp2p1p/1p1n1Bp1/8/6N1/5PK1/3PP3/5R2 w KQkq -',
    '2b2rk1/1ppqnp1p/2np2pB/8/8/1PQ2NP1/2PPPPK1/5R2 w KQkq -',
    '5Nrk/1pp1npp1/pbn5/2q4p/8/1P1QPBP1/2PP1P2/5RK1 w KQkq -',
    '5r1k/1ppqn1p1/p1nb1p2/6Np/8/1P1QPBP1/2PP1P2/5RK1 w KQkq -',
    '5rk1/1ppqnpp1/p1nb3p/8/3P4/P1PQPNP1/1PB2PK1/R4R2 w KQkq -',
    '8/7k/8/8/1K6/8/6Q1/5R2 w KQkq -',
    '8/8/8/8/1K3Q2/7k/5R2/8 w KQkq -',
    '1r3rk1/5R1R/2pp4/1p6/8/2PNPP2/3PK3/8 w KQkq -',
    '5R2/6pk/2pp2Np/1p5P/2b3P1/2P5/r2P2K1/8 w KQkq -',
    '6k1/pbp3pr/1p4N1/8/5RP1/2P3K1/6P1/8 w KQkq -',
    '5r2/pb4p1/3p4/2qk4/3p2P1/3P1NK1/6P1/4QR2 w KQkq -',
    'b7/krp3p1/p7/P7/1N6/6P1/5P2/4R1K1 w KQkq -',
    '6k1/1br3p1/p5P1/1p6/8/6P1/5P2/4R1K1 w KQkq -',
    '6k1/1b3ppp/p7/1p1q4/8/6P1/5P1P/4R1K1 w KQkq -',
    '2kr4/1ppq1pbp/1p3np1/8/Q7/2P1N1P1/PP3PBP/2R1R1K1 w KQkq -',
    '2R1R3/pp3ppk/1p4p1/7q/8/2P1N1P1/PP3PBP/6K1 w KQkq -',
    '4r1k1/pppq1p2/2n2Bp1/3N4/P1P5/1P4P1/5PK1/4R2R w KQkq -',
    '8/1bpr1pk1/1pnq2p1/p7/P1P4Q/1P3NP1/5PK1/4R2R w KQkq -',
    '5rk1/1bp2pn1/1p4p1/p7/P1P3N1/1P3PP1/5PK1/7R w KQkq -',
    '3q1r2/1b1pkp1R/1p1Np1p1/p1p1Pn2/P1P5/1P3PP1/3BRK2/4R3 w KQkq -',
    '3r4/1bpp1p2/1pk1p1p1/p3Pn2/PPPP4/4NPP1/2B2K2/4R3 w KQkq -',
    '5rk1/1bp3p1/1p3pP1/p3pP2/PP2P3/4NK2/7Q/8 w KQkq -',
    '3k4/3p2p1/2pB1bP1/p1P2P1r/P7/4K3/8/1R6 w KQkq -',
    '8/k4pp1/p4b2/P6r/8/4P1B1/4KPB1/1R6 w KQkq -',
    '6k1/1q1p1p1p/p1pQ2pB/Pr6/8/4P3/4KPB1/3R4 w KQkq -',
    '8/8/8/8/8/1K6/5Q2/k7 w KQkq -',
    '1kn5/1pp2pp1/4pnqp/8/8/1P2P3/QKPP3P/R7 w KQkq -',
    '2kr4/2p2pp1/1pQ1pnqp/8/4P3/1PNP2P1/1KP4P/R7 w KQkq -',
    '4Q3/2pr2pk/1p1rp1Np/5p1P/4P3/1P1P4/1KP4P/8 w KQkq -',
    '6rk/pbpp2pp/1pq5/6NP/4P3/3P4/1PPQ3P/2KR4 w KQkq -',
    '6rk/p1pp2pp/1pq1b3/4P1NP/3P4/2PQ4/1P5P/2KR4 w KQkq -',
    '5rrk/pbpp2pp/1p6/4P1N1/3P4/1PP2P2/2K3P1/5R1R w KQkq -',
    '5rk1/2pp1n1p/1p2bPpQ/p3P3/3P4/1PP5/2K2R2/8 w KQkq -',
    '5rk1/2ppq1pp/1p2b3/p5N1/2PP3Q/1P6/5PP1/5RK1 w KQkq -',
    '5rk1/1bp2p1p/1p1q1Bp1/p7/2PP2N1/1P2Q3/5PP1/5RK1 w KQkq -',
    '3r1rk1/1bpp1ppp/1pnq4/p7/2PP4/1P1Q1N1P/PBB2PP1/3R1RK1 w KQkq -',
    '5rrk/qbpp2pp/1pn2p2/p3N3/2PP4/1P3PP1/PB2QPK1/3R3R w KQkq -',
    '4r1rk/1bpp2pp/1pnq1p2/p7/2PP3N/1P2P2Q/PB3PP1/3R1RK1 w KQkq -',
    '4r1rk/1bpR1R1p/1pn5/p7/2PP3N/1P2P3/PB3PP1/6K1 w KQkq -',

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
    '4k3/7R/R7/8/8/2K5/8/8 w KQkq -', 
    '2r4r/1q4p1/p2Q4/1p1nB1Pp/2k5/7P/PPP2P2/3R2K1 w - -',
    'r1r3k1/pp1bbR2/1q4B1/3pQ2p/3P1n2/PP6/1BP3PP/5RK1 w - -',
    '6Q1/1p3r2/p4P1k/8/8/2P3R1/Pq4PK/8 w - -',
    'rnQ2bBr/pp6/2pk3p/2qN4/5p1P/8/PPPP2P1/R1BK4 w - -',
    '2b1r1rk/p1p5/1p1pPP1q/1P1P4/6P1/B1PQ4/P6R/6K1 w - -',
    '3r1rk1/p1pqbp2/1pn3pp/8/8/1B1P1NQ1/PB2PPPP/5RK1 w KQkq -',
    'r4r2/pbpq1p1k/1pn3pp/8/8/1BQP1N1P/PB2PPP1/5RK1 w KQkq -',
    '7R/4kp2/1pnppN1p/8/8/2BPPK1P/1P6/r7 w KQkq -',
    '7r/2p1pp1k/2np3p/7N/8/1P2P2P/1BP4K/6R1 w KQkq -',
    '5b1r/2p2p1k/2npp2p/7N/8/2P1P2P/1P5K/6R1 w KQkq -',
    '5b1r/2p1p2k/2np1p1p/7N/8/2P1P2P/1P4Q1/1K4R1 w KQkq -',
    '6kr/2p1pp1p/6pB/8/8/2P1P2P/1P4b1/1K1R4 w KQkq -',
    '3R1B1k/pb2pp1p/1p4p1/8/8/2P1P1rP/1P6/1K6 w KQkq -',
    '5rk1/pb3p2/1p2pBp1/8/8/2P2P2/1P4P1/1K5R w KQkq -',
    '5k2/1Q6/6P1/8/8/8/8/1K6 w KQkq -',
    '8/3B4/6P1/k7/8/3Q4/8/1K6 w KQkq -',
    '1k6/8/B5K1/3Q4/8/8/8/8 w KQkq -',
    '7k/8/4B1K1/8/7B/8/8/8 w KQkq -',
    '8/8/8/8/8/1KN5/8/k1B5 w KQkq -',
    '8/5N2/5B2/5B1k/8/8/5KN1/8 w KQkq -',
    '3k4/3p4/7r/3N4/8/8/5K2/1R6 w KQkq -',
    '1r5k/R6p/5Np1/1r3p2/8/5PP1/4PK2/8 w KQkq -',
    '7k/R6p/5Np1/6P1/3r1PK1/8/8/8 w KQkq -',
    '7k/7p/2R3pP/8/5PK1/5N2/1r6/8 w KQkq -',
    'R7/1kp4p/1pN3p1/8/8/6P1/1r1r1PBK/8 w KQkq -',
    'r1r5/1kp4R/1p3pq1/p7/8/6P1/1Q3PK1/1R6 w KQkq -', 
    '8/1kp4r/1p3pq1/8/8/6P1/Q4PK1/R7 w KQkq -',
    'r2qr1n1/pbp2k2/1p3p2/4pP2/3pP2Q/B2N1K2/2P3PP/5B1R w KQkq -',
    '8/pbpr1k2/1p3p2/4pP2/3pP3/B2N1K2/q1P2PQP/5B2 w KQkq -',
    '8/4p2R/3pPk2/2pP1P2/5K2/q7/7R/8 w KQkq -',
    'R7/2pk4/1rp5/4K3/5p1p/B5pP/5r2/3B4 w - -',
    '7Q/8/8/6p1/5qk1/8/6K1/8 w KQkq -',
    '8/8/2p5/2kq4/8/2K5/8/1Q6 w KQkq -',
    '8/4q3/4kp2/8/2K5/8/8/7Q w KQkq -',
    '8/4ppr1/6kr/1Q6/2P1K3/1P6/8/8 w KQkq -',
    '6Q1/4p3/3p3r/3P3k/4KP1r/8/8/8 w KQkq -',
    '1Q6/4p3/8/r7/k7/r2P4/2KB4/8 w KQkq -',
    'q7/2n1Nppk/8/8/1R6/5P2/4PB2/1R2K3 w KQkq -',
    'r4r2/pbpqNppk/1p6/nP3P2/1B1PP3/R7/6PP/5RK1 w KQkq -',
    'r6r/R7/1pp1pk2/1P2Np2/1q1PnP2/4P3/6PP/R5K1 w KQkq -',
    '2r4r/R7/1p3pk1/1Pp2Np1/3nP1P1/5P2/6PP/5R1K w KQkq -',
    'r4rk1/p5p1/1p2qpP1/8/8/1P6/P4PPQ/R4RK1 w KQkq -',
    '3q2Q1/2pk3K/1p1p4/3P2p1/2P5/4P3/6PP/8 w KQkq -',
    'r4rk1/pb3p2/1p2q1p1/2p5/4P3/1P4P1/PB2QPK1/R6R w KQkq -',
    '5k2/6p1/R3K3/8/8/8/8/8 w KQkq -',
'4B3/1K6/7B/k7/8/8/8/8 w KQkq -',
'4k3/2K5/6N1/1N6/8/8/8/8 w KQkq -',
'7k/8/8/8/8/8/2Q5/1B4K1 w KQkq -',
'1k6/8/8/8/8/5Q2/8/2K4B w KQkq -',
'2k5/3q4/8/8/8/6Q1/7B/2K5 w KQkq -',
'4k3/8/3K4/8/8/8/Q7/8 w KQkq -',
'8/3K4/8/3k4/6R1/8/8/6Q1 w KQkq -',
'8/8/8/8/8/2N3K1/6B1/6k1 w KQkq -',
'k7/pp3r2/8/8/8/8/2R3PP/7K w KQkq -',
'8/R4b2/4k3/8/2N3PK/2r5/6Q1/2q5 w KQkq -',
'8/8/7k/4N3/8/3Q4/5q1r/1K6 w KQkq -',
'7k/8/5P1K/8/8/8/1B6/8 w KQkq -',
'R7/7B/8/8/K7/8/8/k7 w KQkq -',
'8/8/1R6/5kp1/8/5K2/1B6/8 w KQkq -',
'k7/7R/2N5/8/8/8/8/4K3 w KQkq -',
'3nkb2/2K5/8/8/4N3/8/8/4R3 w KQkq -',
'8/3Q4/8/4k3/8/4K3/7N/8 w KQkq -',
'8/8/1Q6/3k4/5K2/7B/8/8 w KQkq -',
'8/8/8/5k2/5P2/5K2/Q7/8 w KQkq -',
'8/8/8/8/8/3K4/7Q/qk6 w KQkq -',
'6k1/p7/6K1/8/8/8/8/Q7 w KQkq -',
'8/8/r7/k1K5/p7/8/1P6/R7 w KQkq -',
'6k1/R7/8/8/8/8/6K1/1R6 w KQkq -',
'1k6/7R/8/8/8/8/8/QK6 w KQkq -',
'8/8/5R2/2k5/2Pq4/2K1P3/8/8 w KQkq -',
'3k4/3P4/3KP3/8/8/8/8/8 w KQkq -',
'8/8/7p/5K1k/7b/8/6P1/8 w KQkq -',
'1r6/2b1p3/3pk3/6K1/6P1/5P2/2Q5/8 w KQkq -',
'5k2/5P2/3K4/8/5N2/8/8/5R2 w KQkq -',
'2k5/4K3/8/8/8/8/7B/5B2 w KQkq -',
'3bk3/8/3PK3/8/8/B7/8/8 w KQkq -',
'5k2/3K4/5q2/8/8/8/B7/2B2R2 w KQkq -',
'2k5/1p2K3/2q5/8/8/8/7B/2R2B2 w KQkq -',
'k7/prp5/8/8/8/8/6B1/2K4R w KQkq -',
'1B6/8/8/8/8/8/p7/k1K5 w KQkq -',
'3rkn2/R7/4N3/8/8/8/8/4K3 w KQkq -',
'4rkn1/1R6/8/8/8/8/1B4K1/8 w KQkq -',
'1R6/8/8/q7/k7/8/KP6/8 w KQkq -',
'6R1/5k2/3K1p2/8/8/8/8/1B6 w q -',
'4K3/8/B5kr/6pp/8/8/1B6/8 w q -',
'3r4/p1p5/kp5R/4Q1P1/1P5P/P7/K5B1/8 w KQkq -',
'1kq5/8/8/1N6/8/8/8/4K1Q1 w KQkq -',
'2bk4/4R3/1KP2P2/8/8/8/8/8 w KQkq -',
'8/5Q2/1N6/4k3/8/4K3/8/8 w - -',
'3Q4/B7/8/8/8/8/6pk/K7 w - -',
'1r1B4/kp6/8/8/8/8/8/3R2K1 w - -',
'8/8/7R/3k4/3P4/3K4/2P5/8 w - -',
'8/8/8/4k1K1/4P3/1Q6/8/8 w - -',
'8/p3q3/1k6/pP4K1/8/2Q5/8/8 w - -',
'1r6/3Q4/3N1kq1/4rb2/8/8/1B6/1K3R2 w - -',
'8/8/8/5N2/8/8/5K1n/7k w - -',
'5K1k/7b/3N4/8/8/8/8/8 w - -',
'k1B2K2/n7/N2N4/8/8/8/8/8 w - -',
'k7/n1K5/1P6/8/8/8/8/8 w - -',
'3qk3/5b2/8/7Q/8/8/B7/4K3 w - -',
'3qk3/3n1p2/4P3/8/8/B7/8/5RK1 w - -',
'3qkb2/3pp3/6p1/8/4N3/8/4Q3/4K3 w - -',
'3qkb2/4p3/8/4N3/8/1B6/8/4K3 w - -',
'3qkb2/4np2/8/8/4N3/8/8/4K3 w - -',
'4k3/8/5K2/8/8/8/8/2Q5 w - -',
'8/8/1p6/k7/2K1Q3/8/8/8 w - -',
'1k3nq1/r7/8/8/8/2Q4K/8/2R5 w - -',
'k3B2R/8/1K5r/8/8/8/8/8 w - -',
'7k/8/7K/4N3/8/8/B7/8 w - -',
'6B1/5R2/8/1p4p1/N1k5/2P1K2r/6r1/1b6 w - -',
'R7/Bp6/k7/8/2P5/8/r7/5K1r w - -',
'8/7Q/2R5/3k4/4q3/4K3/r7/8 w - -',
'rN1Q4/pk4bR/8/8/8/8/1q5R/1K6 w - -',
'R7/7k/8/5K2/8/8/8/B7 w - -',
'4q3/3k4/1K2n3/8/8/7B/8/2Q5 w - -',
'5K1k/6R1/8/8/3B4/b7/8/8 w - -',
'1k6/p7/3K4/8/8/6B1/8/7B w - -',
'8/8/5k2/8/4RK2/8/8/5QR1 w - -',
'8/8/4q3/3kP3/3P4/1P3K2/6B1/8 w - -',
'k7/p7/2K5/8/8/8/8/6R1 w - -',
'4k3/Q7/5K2/8/8/8/8/8 w - -',
'5rk1/5b1p/8/8/6N1/2B5/1K6/8 w - -',
'8/r3N1pk/8/8/8/8/2R5/2K5 w - -',
'1kr5/2p5/K4N2/8/8/8/6B1/8 w - -',
'8/Q7/6k1/1R6/2R5/8/8/7K w - -',
'7k/8/6K1/8/8/8/6Q1/8 w - -',
'5Q2/8/2K5/k7/8/8/8/8 w - -',
'8/7B/8/8/1K6/1pP5/k1P4R/r7 w - -',
'7k/5Kbn/8/8/8/8/1B6/8 w - -',
'6k1/5prp/8/8/8/8/8/2R2K2 w - -',
'8/6r1/6pk/8/5K2/8/8/R7 w - -',
'5K1k/r7/8/8/8/1Q6/8/8 w - -',
'rk6/2p5/B7/8/1N6/8/8/6K1 w - -',
'8/8/8/2K5/k7/7R/1P6/8 w - -',
'k7/1b6/2N5/3N4/8/5K2/8/6b1 w - -',
'2KB4/b7/k7/7R/8/8/8/8 w - -',
'r4k2/8/5K2/7R/8/8/8/8 w - -',
'8/4r3/2N1kn2/8/5K2/8/8/3R4 w - -',
'8/3K4/8/3kp3/1P1r2N1/5P2/8/8 w - -',
'8/8/1N2r3/2Ppk3/6P1/4K3/8/8 w - -',
'8/3R2n1/2P1kb2/8/5K2/8/8/3B4 w - -',
'6r1/7k/5Pq1/1R6/8/8/8/1B5K w - -',
'5rk1/5p2/8/8/8/8/7R/R6K w - -',
'8/3K1k2/8/8/8/2Q5/1B6/8 w - -',

    




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







