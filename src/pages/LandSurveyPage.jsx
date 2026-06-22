import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Map, Calculator, FileCheck, CheckCircle, XCircle, Clock,
  ArrowRight, MapPin,
} from 'lucide-react'

import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'
import villages from '../data/villages.json'
import properties from '../data/properties.json'

const verificationSamples = [
  { surveyNo: '1245/1', village: 'Raysan', status: 'verified', owner: 'Rajesh Patel', area: '2 Acres' },
  { surveyNo: '892/3', village: 'Kudasan', status: 'verified', owner: 'Priya Shah', area: '200 Sq.Yd' },
  { surveyNo: '445/3', village: 'Koba', status: 'pending', owner: 'Under Review', area: '0.5 Acres' },
  { surveyNo: '334/1', village: 'Sargasan', status: 'verified', owner: 'Industrial Estates Ltd', area: '0.8 Acres' },
]

export default function LandSurveyPage() {
  const [surveySearch, setSurveySearch] = useState('')
  const [villageFilter, setVillageFilter] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [searched, setSearched] = useState(false)

  const [calcUnit, setCalcUnit] = useState('sqyd')
  const [calcLength, setCalcLength] = useState('')
  const [calcWidth, setCalcWidth] = useState('')
  const [calcResult, setCalcResult] = useState(null)

  const handleSurveySearch = (e) => {
    e.preventDefault()
    setSearched(true)
    const found = properties.find(
      (p) =>
        p.surveyNumber.toLowerCase().includes(surveySearch.toLowerCase()) &&
        (!villageFilter || p.village === villageFilter)
    )
    setSearchResult(found || null)
  }

  const handleCalculate = () => {
    const l = parseFloat(calcLength)
    const w = parseFloat(calcWidth)
    if (!l || !w) return

    let sqMeters
    if (calcUnit === 'sqyd') {
      sqMeters = (l * w) / 1.19599
    } else if (calcUnit === 'ft') {
      sqMeters = (l * 0.3048) * (w * 0.3048)
    } else {
      sqMeters = l * w
    }

    setCalcResult({
      sqMeters: sqMeters.toFixed(2),
      sqYards: (sqMeters * 1.19599).toFixed(2),
      acres: (sqMeters / 4046.86).toFixed(4),
      vigha: (sqMeters / 1618.74).toFixed(4),
    })
  }

  const statusIcon = (status) => {
    if (status === 'verified') return <CheckCircle className="w-5 h-5 text-green-500" />
    if (status === 'pending') return <Clock className="w-5 h-5 text-accent" />
    return <XCircle className="w-5 h-5 text-red-500" />
  }

  return (
    <>
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary via-primary to-secondary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Land Survey Tools
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional Land Survey Services
            </h1>
            <p className="text-white/70 text-lg">
              Search survey numbers, explore village maps, calculate land area, and verify property status across Gandhinagar district.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Survey Number Search */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <SectionHeader
              badge="Search"
              title="Survey Number Search"
              subtitle="Enter a survey number to find property details and verification status."
            />
          </ScrollReveal>
          <ScrollReveal>
            <form onSubmit={handleSurveySearch} className="glass rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Survey Number</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type="text"
                      required
                      value={surveySearch}
                      onChange={(e) => setSurveySearch(e.target.value)}
                      placeholder="e.g. 1245/1"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Village</label>
                  <select
                    value={villageFilter}
                    onChange={(e) => setVillageFilter(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                  >
                    <option value="">All Villages</option>
                    {villages.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                Search Survey Record
              </button>
            </form>
          </ScrollReveal>

          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              {searchResult ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                    <CheckCircle className="w-5 h-5" /> Record Found
                  </div>
                  <h3 className="font-bold text-primary text-lg">{searchResult.title}</h3>
                  <p className="text-muted text-sm mt-1">Survey No: {searchResult.surveyNumber} | {searchResult.village}, {searchResult.location}</p>
                  <Link to={`/properties/${searchResult.id}`} className="inline-flex items-center gap-1 text-secondary font-medium text-sm mt-3 hover:gap-2 transition-all">
                    View Property Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
                  <div className="flex items-center gap-2 font-semibold">
                    <XCircle className="w-5 h-5" /> No matching survey record found
                  </div>
                  <p className="text-sm mt-2 text-red-600">Try a different survey number or contact us for manual verification.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Village Maps */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Maps"
              title="Village Map Search"
              subtitle="Explore revenue maps and survey records for villages across Gandhinagar district."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villages.map((village, i) => (
              <ScrollReveal key={village.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={village.image} alt={village.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-bold text-lg">{village.name}</h3>
                      <p className="text-xs text-white/70">{village.taluka} Taluka</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Map className="w-4 h-4 text-secondary" />
                      {village.surveyCount} survey records
                    </div>
                    <button className="text-secondary text-sm font-semibold hover:underline">View Map</button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Land Calculator */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <SectionHeader
              badge="Calculator"
              title="Land Measurement Calculator"
              subtitle="Convert and calculate land area between different units commonly used in Gujarat."
            />
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Unit</label>
                  <select
                    value={calcUnit}
                    onChange={(e) => setCalcUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none"
                  >
                    <option value="sqyd">Square Yards</option>
                    <option value="ft">Feet</option>
                    <option value="m">Meters</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Length</label>
                  <input
                    type="number"
                    value={calcLength}
                    onChange={(e) => setCalcLength(e.target.value)}
                    placeholder="Enter length"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Width</label>
                  <input
                    type="number"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(e.target.value)}
                    placeholder="Enter width"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleCalculate}
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Calculator className="w-5 h-5" /> Calculate Area
              </button>

              {calcResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200"
                >
                  {[
                    { label: 'Square Meters', value: calcResult.sqMeters },
                    { label: 'Square Yards', value: calcResult.sqYards },
                    { label: 'Acres', value: calcResult.acres },
                    { label: 'Vigha (Guj.)', value: calcResult.vigha },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                      <div className="text-xs text-muted mb-1">{item.label}</div>
                      <div className="text-lg font-bold text-secondary">{item.value}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Verification Status */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Verification"
              title="Property Verification Status"
              subtitle="Recent survey verification requests and their current status."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {verificationSamples.map((item, i) => (
              <ScrollReveal key={item.surveyNo} delay={i * 0.08}>
                <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-secondary/20 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">Survey {item.surveyNo}</span>
                      {statusIcon(item.status)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted mt-0.5">
                      <MapPin className="w-3.5 h-3.5" /> {item.village} &middot; {item.area}
                    </div>
                    <div className="text-xs text-muted mt-1">Owner: {item.owner}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    item.status === 'verified' ? 'bg-green-100 text-green-700' :
                    item.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
