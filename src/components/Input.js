import React from 'react'

export default function Input({ label, placeholder, type, className, value, onChange }) {
  return (
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text font-semibold text-[#004f4f] text-base mb-2">{ label }</span>
        </label>
        <input type={ type } placeholder={ placeholder } className={`input input-bordered w-full text-[#6B7193] mb-[14px] rounded-full ${className}`} value={value} onChange={onChange} required/>
    </div>
  )
}
