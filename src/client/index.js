const TOOLTIPS = [
    "basic_electronic_circuit",
    "basic_integrated_circuit",
    "microchip_processor",

    "good_electronic_circuit",
    "good_integrated_circuit",
    "micro_processor",

    "advanced_integrated_circuit",
    "micro_processor_assembly",
    "nano_processor",

    "micro_processor_computer",
    "nano_processor_assembly",
    "quantum_processor",

    "micro_processor_mainframe",
    "nano_processor_computer",
    "quantum_processor_assembly",
    "crystal_processor",

    "nano_processor_mainframe",
    "quantum_processor_computer",
    "crystal_processor_assembly",
    "wetware_processor",

    "quantum_processor_mainframe",
    "crystal_processor_computer",
    "wetware_processor_assembly",
]

// love to have to dig into the source code. fucking kys kubejs
ItemEvents.tooltip((event) => {
    for (let name of TOOLTIPS) {
        event.add(`gtceu:${name}`, Component.of({translate: `tooltip.${name}`}));
    }
});