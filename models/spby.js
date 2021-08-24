const mongoose = require('mongoose')
const spby = mongoose.model('spby', {
    noSPBY: String,
    tglSPBY: { type: Date, default: Date.now },
    uraian: String,
    nilaiSPBY: Number,
    terbilang: String,
    kodeKeg: String,
    kodeOutput: String,
    kodeKomp: String,
    kodeSubKomp: String,
    kodeAkun: String
})

module.exports = spby