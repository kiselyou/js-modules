import nodemailer from 'nodemailer'
import objectPath from 'object-path'
import { apiConfig } from './../config/config'

const config = objectPath.get(apiConfig, ['mail', 'transporter'])
let transporter = nodemailer.createTransport(config);

/**
 *
 * @param {Array|string} receivers
 * @param {string} subject
 * @param {string} text
 * @returns {Promise<void>}
 */
export async function sendMailText(receivers, subject, text) {
  const from = objectPath.get(apiConfig, ['mail', 'sender'])
  const to = Array.isArray(receivers) ? receivers.join(', ') : receivers
  return await transporter.sendMail({ from, to, subject, text });
}

/**
 *
 * @param {Array|string} receivers
 * @param {string} subject
 * @param {string} html
 * @returns {Promise<void>}
 */
export async function sendMailHtml(receivers, subject, html) {
  const from = objectPath.get(apiConfig, ['mail', 'sender'])
  const to = Array.isArray(receivers) ? receivers.join(', ') : receivers
  return await transporter.sendMail({ from, to, subject, html });
}