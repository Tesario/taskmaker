db.tasks.deleteMany({});

const taskDB = [
  {
    id: 1,
    title: "Math test",
    desc: `# Subiungit arguit sanguine

    ## Imitatus dentibus quatiens hortatibus nondum indignantibus pectora
    
    Lorem markdownum cruento tempora. Arva nec Chrysenque etiam. Non locuta, paries
    latus coniunx dea geminae lateat! Multo esse aere sanguine **barbarica** vaga:
    pressere potes *Poeantia metuitque*. Matrisque tacetve.
    
    Narretque utilium, me honos sulcis primis! Te saeviat tecti ardet talibus; ore
    tum vincula [dixit demum ora](http://et-vulnere.net/vero); et premis et multis
    matrisque. O uterum admovet nec alta; erravit de [quia](http://inque.io/).
    Achillem non inermia deperit ventis frustra clarissimus virginei rege, elusaque;
    ille Iuno separat prope advertens **undis** ensis rastrique.
    
        var southbridgePmuEncoding = management_link(ircBareRpm + syntax, -4) *
                down_device(orientationVirtual) * 1;
        case_opacity_log.wordart_session_desktop = meta.script_access(
                petabyte_software_file + exabyte_refresh, softwareMarketing,
                visualInstaller(petaflops)) - white(69, laserInternalSector, -4);
        if (413618 + cpa_dma_risc.spriteDebugger(computingTrinitron, dma, 3 +
                superscalar_access_xmp)) {
            rgb_trackback.big_regular = secondary / vertical_e_clone(activeVrml,
                    computer_ip, tweakBatchInteger);
            ppga_integer_affiliate.memoryMode(oasisTwainBackside);
            piconet_browser /= sync_mebibyte_wavelength(rw_solid);
        }
        var rate = white_switch_raid;`,
    status: "expired",
    created: new Date("2019-01-15"),
    due: new Date("2021-04-4"),
    priority: 1,
  },
  {
    id: 2,
    title: "Physic test",
    status: "done",
    created: new Date("2022-04-4"),
    due: new Date("2022-04-4"),
    priority: 3,
  },
  {
    id: 3,
    title: "Science test",
    desc: `Est vulnere conplexu crimen etiam, urbe astra, et tremulo canos, avellere\nresonat multa ferarum. Quam sunt nempe! Rubentis deus datum et esse nec;\nbracchia iners: cultor quod ore unius dea, antris liquidum sanguine Palameden.\nPulcherrime ocius repulsa, peregit quaerit, hoc maturior adfuit medicamine erat.\nSit gravitate quoque, in e nigrior nostro **adspergine petit** adversaque\npuerilibus loquendi et.\n\nHabebat cortex. Non [nec virga](http://hastilibusneque.org/nubibus-equorum.html)\net pars tum; opem nostri Phlegyis sagittis vertitur pectora.\n\n- Abit disertus comitem percensuit uterque atque dapes\n- Venit furta lacrimas inmemor nec deducentia sacris\n- Quod venere loqui tela restabat Epopeus quoque`,
    status: "done",
    created: new Date("2022-04-4"),
    due: new Date("2022-04-4"),
    priority: 5,
  },
];

db.tasks.insertMany(taskDB);

const count = db.tasks.countDocuments();
print(`Inserted ${count} tasks`);

db.counters.deleteOne({ _id: "tasks" });
db.counters.insertOne({ _id: "tasks", current: count });
