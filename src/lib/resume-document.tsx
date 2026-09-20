import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { personalInfo, skills, experiences, projects } from "@/lib/data";

const ACCENT = "#4f46e5";
const INK = "#0f172a";
const MUTED = "#475569";
const FAINT = "#94a3b8";
const RULE = "#e2e8f0";

// Keep words whole instead of splitting them with hyphens at line ends.
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: INK,
    lineHeight: 1.4,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    paddingBottom: 12,
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    lineHeight: 1.15,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
    color: INK,
    marginBottom: 4,
  },
  title: {
    fontSize: 11.5,
    lineHeight: 1.3,
    color: ACCENT,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  contactItem: { fontSize: 8.5, color: MUTED },
  contactSep: { fontSize: 8.5, color: FAINT, marginHorizontal: 6 },
  link: { color: ACCENT, textDecoration: "none" },
  columns: { flexDirection: "row", gap: 22 },
  main: { flex: 1.9 },
  side: { flex: 1 },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 7,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  paragraph: { color: MUTED, fontSize: 9.5 },
  job: { marginBottom: 10 },
  jobHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  jobRole: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  jobPeriod: { fontSize: 8.5, color: FAINT },
  jobCompany: { fontSize: 9.5, color: ACCENT, marginBottom: 3 },
  jobDesc: { color: MUTED, marginBottom: 3 },
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { width: 10, color: ACCENT },
  bulletText: { flex: 1, color: INK },
  techLine: { fontSize: 8, color: FAINT, marginTop: 3 },
  project: { marginBottom: 6 },
  projectTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  projectMeta: { fontSize: 8, color: FAINT },
  projectDesc: { color: MUTED, fontSize: 8.6 },
  skillGroup: { marginBottom: 7 },
  skillCat: { fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 2 },
  skillItems: { color: MUTED, fontSize: 8.8 },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 42,
    right: 42,
    fontSize: 7.5,
    color: FAINT,
    textAlign: "center",
  },
  projectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  projectCell: { width: "48.5%" },
});

const FULL_NAME = "Isahaq";

function stripUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function ResumeDocument() {
  const ossProjects = projects.filter((p) => p.category === "Open Source");
  const workProjects = projects.filter((p) => p.category !== "Open Source");

  return (
    <Document
      title={`${FULL_NAME} - Resume`}
      author={FULL_NAME}
      subject={personalInfo.title}
      keywords="Full Stack Developer, Laravel, Node.js, React, Next.js, Odoo"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{FULL_NAME}</Text>
          <Text style={styles.title}>
            {personalInfo.title} · {personalInfo.company}
          </Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            <Text style={styles.contactSep}>|</Text>
            <Link
              src={`mailto:${personalInfo.email}`}
              style={[styles.contactItem, styles.link]}
            >
              {personalInfo.email}
            </Link>
            <Text style={styles.contactSep}>|</Text>
            <Link
              src={personalInfo.github}
              style={[styles.contactItem, styles.link]}
            >
              {stripUrl(personalInfo.github)}
            </Link>
            <Text style={styles.contactSep}>|</Text>
            <Link
              src={personalInfo.linkedin}
              style={[styles.contactItem, styles.link]}
            >
              {stripUrl(personalInfo.linkedin)}
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.paragraph}>{personalInfo.bio}</Text>
        </View>

        <View style={styles.columns}>
          {/* Main column */}
          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.job} wrap={false}>
                  <View style={styles.jobHead}>
                    <Text style={styles.jobRole}>{exp.role}</Text>
                    <Text style={styles.jobPeriod}>{exp.period}</Text>
                  </View>
                  <Text style={styles.jobCompany}>{exp.company}</Text>
                  <Text style={styles.jobDesc}>{exp.description}</Text>
                  {exp.highlights.map((h) => (
                    <View key={h} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                  <Text style={styles.techLine}>{exp.tech.join(" · ")}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Side column */}
          <View style={styles.side}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.map((group) => (
                <View key={group.category} style={styles.skillGroup}>
                  <Text style={styles.skillCat}>{group.category}</Text>
                  <Text style={styles.skillItems}>
                    {group.items.map((i) => i.name).join(", ")}
                  </Text>
                </View>
              ))}
              <View style={styles.skillGroup}>
                <Text style={styles.skillCat}>ERP</Text>
                <Text style={styles.skillItems}>
                  Odoo (custom modules), Python, XML views
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Open source — full width, two-column grid (kept on one page) */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Open Source Packages</Text>
          <View style={styles.projectGrid}>
            {ossProjects.map((p) => {
              const registry = "registry" in p ? p.registry : undefined;
              const stats = "stats" in p ? p.stats : undefined;
              const meta = [
                registry ? `${registry} package` : null,
                stats?.version ?? null,
                stats?.license ?? null,
              ]
                .filter(Boolean)
                .join(" · ");
              return (
                <View
                  key={p.id}
                  style={[styles.project, styles.projectCell]}
                  wrap={false}
                >
                  <Text style={styles.projectTitle}>{p.title}</Text>
                  {meta && <Text style={styles.projectMeta}>{meta}</Text>}
                  <Text style={styles.projectDesc}>{p.description}</Text>
                  {p.link && (
                    <Link
                      src={p.link}
                      style={[styles.projectMeta, styles.link]}
                    >
                      {stripUrl(p.link)}
                    </Link>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Projects — full width, two-column grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={120}>
            Selected Projects
          </Text>
          <View style={styles.projectGrid}>
            {workProjects.map((p) => (
              <View
                key={p.id}
                style={[styles.project, styles.projectCell]}
                wrap={false}
              >
                <Text style={styles.projectTitle}>
                  {p.title}{" "}
                  <Text style={styles.projectMeta}>— {p.category}</Text>
                </Text>
                <Text style={styles.projectDesc}>{p.description}</Text>
                <Text style={styles.techLine}>{p.tech.join(" · ")}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer} fixed>
          {FULL_NAME} · {personalInfo.title} · {personalInfo.email} ·{" "}
          {stripUrl(personalInfo.github)}
        </Text>
      </Page>
    </Document>
  );
}
